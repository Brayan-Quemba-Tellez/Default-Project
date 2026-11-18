from typing import Optional, List
from datetime import datetime
from decimal import Decimal
import uuid
from pydantic import BaseModel, Field, ConfigDict

class ProductBase(BaseModel):
    category_id: uuid.UUID
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: Decimal
    discount_price: Optional[Decimal] = None
    stock_quantity: int = 0
    sku: Optional[str] = None
    is_available: bool = True
    is_featured: bool = False
    image_urls: List[str] = []
    specifications: dict = {}

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: Optional[Decimal] = None
    discount_price: Optional[Decimal] = None
    stock_quantity: Optional[int] = None
    sku: Optional[str] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    image_urls: Optional[List[str]] = None
    specifications: Optional[dict] = None

class ProductResponse(ProductBase):
    id: uuid.UUID
    vendor_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ProductFilter(BaseModel):
    category: Optional[str] = None
    sector: Optional[str] = None
    min_price: Optional[Decimal] = None
    max_price: Optional[Decimal] = None
    search: Optional[str] = None
    featured: Optional[bool] = None
    page: int = 1
    limit: int = 20
