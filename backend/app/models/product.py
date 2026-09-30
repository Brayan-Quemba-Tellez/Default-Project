from sqlalchemy import String, Boolean, INTEGER, DECIMAL, TIMESTAMP, JSONB, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    vendor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    short_description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[object] = mapped_column(DECIMAL(10,2), nullable=False)
    discount_price: Mapped[object | None] = mapped_column(DECIMAL(10,2), nullable=True)
    stock_quantity: Mapped[int] = mapped_column(INTEGER, default=0)
    sku: Mapped[str | None] = mapped_column(String(100), unique=True, nullable=True)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    image_urls: Mapped[object] = mapped_column(JSONB, server_default="'[]'::jsonb")
    specifications: Mapped[object] = mapped_column(JSONB, server_default="'{}'::jsonb")
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    category = relationship("Category", back_populates="products")
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
