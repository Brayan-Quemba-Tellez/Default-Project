from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate, AppointmentResponse, AvailableSlotsResponse
from app.services.appointment_service import AppointmentService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[AppointmentResponse])
async def list_appointments(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Listar citas del usuario autenticado."""
    service = AppointmentService(session)
    return await service.list_appointments(user_id=current_user.id)


@router.get("/available", response_model=AvailableSlotsResponse)
async def available_slots(
    date: str = Query(...),
    service_type: str = Query(...),
    session: AsyncSession = Depends(get_session),
):
    """Obtener horarios disponibles (público)."""
    service = AppointmentService(session)
    return await service.get_available_slots(date, service_type)


@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(
    appointment: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Agendar nueva cita."""
    service = AppointmentService(session)
    return await service.create(appointment, user_id=current_user.id)


@router.put("/{id}", response_model=AppointmentResponse)
async def update_appointment(
    id: str,
    appointment: AppointmentUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Modificar cita (propietario)."""
    service = AppointmentService(session)
    return await service.update(id, appointment, user_id=current_user.id)


@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def cancel_appointment(
    id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Cancelar cita."""
    service = AppointmentService(session)
    await service.delete(id, user_id=current_user.id)
    return {"detail": "Cita cancelada"}
