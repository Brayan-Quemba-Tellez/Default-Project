from sqlalchemy import String, TEXT, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class ChatConversation(Base):
    __tablename__ = "chat_conversations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    session_id: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="active")
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    messages = relationship("ChatMessage", back_populates="conversation")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("chat_conversations.id"), nullable=False)
    sender: Mapped[str] = mapped_column(String(20), nullable=False)
    message: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())

    conversation = relationship("ChatConversation", back_populates="messages")
