from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date, time, datetime
from decimal import Decimal
import uuid

class UserBase(BaseModel):
    email: str = Field(..., max_length=255)
    full_name: str = Field(..., max_length=200)
    phone: Optional[str] = Field(None, max_length=20)
    document_type: str = Field(..., max_length=20)
    document_number: str = Field(..., max_length=20)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, max_length=200)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)

class UserResponse(UserBase):
    id: uuid.UUID
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int
    user: UserResponse

class TokenRefresh(BaseModel):
    refresh_token: str

class CategoryBase(BaseModel):
    name: str = Field(..., max_length=100)
    slug: str = Field(..., max_length=100)
    description: Optional[str] = None
    parent_id: Optional[uuid.UUID] = None
    sector: str = Field(..., max_length=50)
    image_url: Optional[str] = Field(None, max_length=500)

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
    sector: Optional[str] = Field(None, max_length=50)
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None

class CategoryResponse(CategoryBase):
    id: uuid.UUID
    is_active: bool
    sort_order: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    category_id: uuid.UUID
    name: str = Field(..., max_length=200)
    slug: str = Field(..., max_length=200)
    description: Optional[str] = None
    short_description: Optional[str] = Field(None, max_length=500)
    price: Decimal = Field(..., gt=0)
    discount_price: Optional[Decimal] = Field(None, gt=0)
    stock_quantity: int = Field(default=0, ge=0)
    sku: Optional[str] = Field(None, max_length=100)
    is_available: bool = True
    is_featured: bool = False
    image_urls: List[str] = Field(default_factory=list)
    specifications: dict = Field(default_factory=dict)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=200)
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

    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    product_id: uuid.UUID
    quantity: int = Field(..., ge=1)

class CartItemResponse(CartItemBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    items: List[CartItemResponse]
    subtotal: Decimal
    total: Decimal

class OrderBase(BaseModel):
    shipping_address: dict
    payment_method: Optional[str] = None
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    pass

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

    class Config:
        from_attributes = True

class OrderItemResponse(BaseModel):
    id: uuid.UUID
    order_id: uuid.UUID
    product_id: uuid.UUID
    quantity: int
    unit_price: Decimal
    total_price: Decimal

    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    service_type: str = Field(..., max_length=50)
    title: str = Field(..., max_length=200)
    description: Optional[str] = None
    scheduled_date: date
    scheduled_time: time
    duration_minutes: int = Field(default=60, ge=1)
    location: Optional[str] = Field(None, max_length=300)
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

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

    class Config:
        from_attributes = True

class QuotationBase(BaseModel):
    items: List[dict]
    notes: Optional[str] = None

class QuotationCreate(QuotationBase):
    pass

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

    class Config:
        from_attributes = True

class QuotationItemResponse(BaseModel):
    id: uuid.UUID
    quotation_id: uuid.UUID
    description: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal

class BlogPostBase(BaseModel):
    title: str = Field(..., max_length=300)
    content: str
    category: str = Field(..., max_length=50)
    excerpt: Optional[str] = Field(None, max_length=500)
    tags: List[str] = Field(default_factory=list)
    featured_image: Optional[str] = Field(None, max_length=500)
    is_published: bool = False

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    is_published: Optional[bool] = None

class BlogPostResponse(BaseModel):
    id: uuid.UUID
    author_id: uuid.UUID
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    category: str
    tags: List[str]
    featured_image: Optional[str]
    is_published: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ContactBase(BaseModel):
    name: str = Field(..., max_length=200)
    email: str = Field(..., max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=200)
    message: str
    source: Optional[str] = None
    consent_given: bool = True

class ContactCreate(ContactBase):
    pass

class ContactResponse(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    message: str
    source: Optional[str]
    status: str
    salesforce_id: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class ChatMessageBase(BaseModel):
    conversation_id: uuid.UUID
    message: str
    sender: str

class ChatStart(BaseModel):
    session_id: str
    user_id: Optional[uuid.UUID] = None

class ChatResponse(BaseModel):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender: str
    message: str
    created_at: datetime

class ConsentBase(BaseModel):
    consent_type: str
    is_granted: bool

class ConsentResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    consent_type: str
    is_granted: bool
    ip_address: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class AnalyticsEventBase(BaseModel):
    event_type: str
    event_data: Optional[dict] = None
    session_id: Optional[str] = None

class DashboardResponse(BaseModel):
    total_visits: int
    total_leads: int
    top_products: List[dict]

    class Config:
        from_attributes = True
