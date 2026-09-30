from typing import Optional, List
from datetime import datetime
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class CartItemBase(BaseModel):
    product_id: uuid.UUID
    quantity: int = Field(..., ge=1)

class CartItemCreate(BaseModel):
    product_id: uuid.UUID
    quantity: int = Field(..., ge=1)

class CartItemResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    product_id: uuid.UUID
    quantity: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class CartResponse(BaseModel):
    items: List[CartItemResponse]
    subtotal: Decimal
    total: Decimal
    model_config = ConfigDict(from_attributes=True)

class OrderBase(BaseModel):
    shipping_address: dict
    payment_method: Optional[str] = None
    notes: Optional[str] = None

class OrderCreate(BaseModel):
    shipping_address: dict
    payment_method: str
    notes: Optional[str] = None

class OrderResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    status: str
    subtotal: Decimal
    tax: Decimal
    total: Decimal
    shipping_address: dict
    payment_method: Optional[str]
    payment_status: str
    wompi_transaction_id: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class OrderItemResponse(BaseModel):
    id: uuid.UUID
    order_id: uuid.UUID
    product_id: uuid.UUID
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    model_config = ConfigDict(from_attributes=True)

class AvailableSlots(BaseModel):
    available_slots: List[dict]
