from sqlalchemy import String, Boolean, VARCHAR, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class DataConsent(Base):
    __tablename__ = "data_consents"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    consent_type: Mapped[str] = mapped_column(String(50), nullable=False)
    is_granted: Mapped[bool] = mapped_column(Boolean, default=False)
    ip_address: Mapped[str | None] = mapped_column(VARCHAR(45), nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="data_consents")
