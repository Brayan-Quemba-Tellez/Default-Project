from sqlalchemy import String, Boolean, TIMESTAMP, func, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    document_type: Mapped[str] = mapped_column(String(20), nullable=False)
    document_number: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default="customer")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    cart_items = relationship("CartItem", back_populates="user")
    orders = relationship("Order", back_populates="user")
    appointments = relationship("Appointment", back_populates="user")
    quotations = relationship("Quotation", back_populates="user")
    blog_posts = relationship("BlogPost", back_populates="author")
    contacts = relationship("Contact", back_populates="user")
    data_consents = relationship("DataConsent", back_populates="user")
    products = relationship("Product", back_populates="vendor")
    categories = relationship("Category", backref="categories")
