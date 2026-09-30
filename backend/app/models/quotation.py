from sqlalchemy import String, Boolean, DECIMAL, DATE, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class Quotation(Base):
    __tablename__ = "quotations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="draft")
    subtotal: Mapped[object] = mapped_column(DECIMAL(10,2), nullable=False)
    tax: Mapped[object] = mapped_column(DECIMAL(10,2), default=0)
    total: Mapped[object] = mapped_column(DECIMAL(10,2), nullable=False)
    valid_until: Mapped[object | None] = mapped_column(DATE, nullable=True)
    notes: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    items = relationship("QuotationItem", back_populates="quotation")
    user = relationship("User", back_populates="quotations")

class QuotationItem(Base):
    __tablename__ = "quotation_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quotation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("quotations.id"), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[object] = mapped_column(DECIMAL(10,2), nullable=False)
    total_price: Mapped[object] = mapped_column(DECIMAL(10,2), nullable=False)

    quotation = relationship("Quotation", back_populates="items")
