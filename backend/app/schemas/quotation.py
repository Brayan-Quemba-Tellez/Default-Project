from typing import Optional, List
from datetime import datetime, date
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class QuotationItemBase(BaseModel):
    description: str
    quantity: int
    unit_price: Decimal

class QuotationBase(BaseModel):
    items: List[QuotationItemBase]
    notes: Optional[str] = None

class QuotationCreate(BaseModel):
    items: List[QuotationItemBase]
    notes: Optional[str] = None

class QuotationUpdate(BaseModel):
    status: Optional[str] = None

class QuotationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    status: str
    subtotal: Decimal
    tax: Decimal
    total: Decimal
    valid_until: Optional[date]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class QuotationItemResponse(BaseModel):
    id: uuid.UUID
    quotation_id: uuid.UUID
    description: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    model_config = ConfigDict(from_attributes=True)
