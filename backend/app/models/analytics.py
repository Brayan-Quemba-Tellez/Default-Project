from sqlalchemy import String, TEXT, JSONB, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_type: Mapped[str] = mapped_column(String(50), nullable=False)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    session_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    event_data: Mapped[object] = mapped_column(JSONB, server_default="'{}'::jsonb")
    ip_address: Mapped[str | None] = mapped_column(VARCHAR(45), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())
