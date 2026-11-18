from typing import List, Optional
from uuid import UUID
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.appointment import Appointment
from app.repositories.base import BaseRepository


class AppointmentRepository(BaseRepository[Appointment]):
    def __init__(self, session: AsyncSession):
        super().__init__(Appointment, session)

    async def get_by_user(self, user_id: UUID) -> List[Appointment]:
        result = await self.session.execute(
            select(Appointment).where(Appointment.user_id == user_id).order_by(Appointment.scheduled_date.asc())
        )
        return list(result.scalars().all())

    async def get_by_date(self, target_date: date, service_type: Optional[str] = None) -> List[Appointment]:
        query = select(Appointment).where(
            Appointment.scheduled_date == target_date,
            Appointment.status.in_(["pending", "confirmed"]),
        )
        if service_type:
            query = query.where(Appointment.service_type == service_type)
        result = await self.session.execute(query)
        return list(result.scalars().all())
