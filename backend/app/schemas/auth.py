from typing import Optional
from datetime import date, time
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class UserBase(BaseModel):
    email: str
    full_name: str
    phone: Optional[str] = None
    document_type: str
    document_number: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class UserResponse(UserBase):
    id: uuid.UUID
    role: str
    is_active: bool
    created_at: date
    updated_at: date
    model_config = ConfigDict(from_attributes=True)

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int
    user: UserResponse

class TokenRefresh(BaseModel):
    refresh_token: str
