from typing import Optional, List
from datetime import datetime, date, time
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class AppointmentBase(BaseModel):
    service_type: str
    title: str
    description: Optional[str] = None
    scheduled_date: date
    scheduled_time: time
    duration_minutes: int = Field(default=60, ge=1)
    location: Optional[str] = None
    notes: Optional[str] = None

class AppointmentCreate(BaseModel):
    service_type: str
    title: str
    description: Optional[str] = None
    scheduled_date: date
    scheduled_time: time
    duration_minutes: Optional[int] = 60
    location: Optional[str] = None
    notes: Optional[str] = None

class AppointmentUpdate(BaseModel):
    scheduled_date: Optional[date] = None
    scheduled_time: Optional[time] = None
    duration_minutes: Optional[int] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    service_type: str
    title: str
    description: Optional[str]
    scheduled_date: date
    scheduled_time: time
    duration_minutes: int
    status: str
    location: Optional[str]
    notes: Optional[str]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AvailableSlot(BaseModel):
    time: time
    duration: int

class AvailableSlotsResponse(BaseModel):
    available_slots: List[AvailableSlot]
