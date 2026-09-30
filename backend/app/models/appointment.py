from sqlalchemy import String, INTEGER, DATE, TIME, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    service_type: Mapped[str] = mapped_column(String(50), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    scheduled_date: Mapped[object] = mapped_column(DATE, nullable=False)
    scheduled_time: Mapped[object] = mapped_column(TIME, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(INTEGER, default=60)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")
    location: Mapped[str | None] = mapped_column(String(300), nullable=True)
    notes: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="appointments")
