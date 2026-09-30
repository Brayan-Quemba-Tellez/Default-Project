from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate, AppointmentResponse, AvailableSlotsResponse
from app.services.appointment_service import AppointmentService

router = APIRouter()

@router.get("/", response_model=list[AppointmentResponse])
async def list_appointments(session: AsyncSession = Depends(get_session)):
    service = AppointmentService(session)
    return await service.list_appointments()

@router.get("/available", response_model=AvailableSlotsResponse)
async def available_slots(date: str, service_type: str, session: AsyncSession = Depends(get_session)):
    service = AppointmentService(session)
    return await service.get_available_slots(date, service_type)

@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment: AppointmentCreate, session: AsyncSession = Depends(get_session)):
    service = AppointmentService(session)
    return await service.create(appointment)

@router.put("/{id}", response_model=AppointmentResponse)
async def update_appointment(id: str, appointment: AppointmentUpdate, session: AsyncSession = Depends(get_session)):
    service = AppointmentService(session)
    return await service.update(id, appointment)

@router.delete("/{id}")
async def cancel_appointment(id: str, session: AsyncSession = Depends(get_session)):
    service = AppointmentService(session)
    await service.delete(id)
