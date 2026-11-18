from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from datetime import datetime, date
import uuid
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate, AvailableSlotsResponse


class AppointmentService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_appointments(self, user_id: uuid.UUID) -> list[Appointment]:
        query = (
            select(Appointment)
            .where(Appointment.user_id == user_id)
            .order_by(Appointment.scheduled_date.asc())
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_available_slots(self, date_str: str, service_type: str) -> AvailableSlotsResponse:
        slots = ["09:00", "10:00", "11:30", "14:00", "15:30", "16:30"]
        return AvailableSlotsResponse(date=date_str, available_slots=slots)

    async def create(self, appointment_data: AppointmentCreate, user_id: uuid.UUID) -> Appointment:
        data = (
            appointment_data.model_dump()
            if hasattr(appointment_data, "model_dump")
            else appointment_data.dict()
        )

        # Verificar que la fecha sea futura
        if data["scheduled_date"] < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="La fecha debe ser futura",
            )

        data["user_id"] = user_id
        data["status"] = "pending"

        appointment = Appointment(**data)
        self.session.add(appointment)
        await self.session.commit()
        await self.session.refresh(appointment)
        return appointment

    async def update(self, id: str, appointment_data: AppointmentUpdate, user_id: uuid.UUID) -> Appointment:
        app_uuid = uuid.UUID(id) if isinstance(id, str) else id
        appointment = await self.session.get(Appointment, app_uuid)
        if not appointment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cita no encontrada")
        if appointment.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
        if appointment.scheduled_date < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se puede modificar cita pasada",
            )

        data = (
            appointment_data.model_dump(exclude_unset=True)
            if hasattr(appointment_data, "model_dump")
            else appointment_data.dict(exclude_unset=True)
        )
        for key, value in data.items():
            if value is not None and hasattr(appointment, key):
                setattr(appointment, key, value)

        await self.session.commit()
        await self.session.refresh(appointment)
        return appointment

    async def delete(self, id: str, user_id: uuid.UUID):
        app_uuid = uuid.UUID(id) if isinstance(id, str) else id
        appointment = await self.session.get(Appointment, app_uuid)
        if not appointment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cita no encontrada")
        if appointment.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
        if appointment.scheduled_date < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se puede cancelar cita pasada",
            )
        appointment.status = "cancelled"
        await self.session.commit()
