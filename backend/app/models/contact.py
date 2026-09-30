from sqlalchemy import String, TEXT, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    company: Mapped[str | None] = mapped_column(String(200), nullable=True)
    message: Mapped[str] = mapped_column(String, nullable=False)
    source: Mapped[str | None] = mapped_column(String(50), nullable=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="new")
    salesforce_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="contacts")
