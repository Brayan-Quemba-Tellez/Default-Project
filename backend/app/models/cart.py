from sqlalchemy import Integer, UUID, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class CartItem(Base):
    __tablename__ = "cart_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    product_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    __table_args__ = (
        {"unique_constraint": "(user_id, product_id)"},
    )

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")
