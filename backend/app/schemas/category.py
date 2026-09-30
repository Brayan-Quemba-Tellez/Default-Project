from typing import Optional, List
from datetime import datetime
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    parent_id: Optional[uuid.UUID] = None
    sector: str
    image_url: Optional[str] = None

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    parent_id: Optional[uuid.UUID] = None
    sector: str
    image_url: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    sector: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None

class CategoryResponse(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    description: Optional[str]
    parent_id: Optional[uuid.UUID]
    sector: str
    image_url: Optional[str]
    is_active: bool
    sort_order: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
