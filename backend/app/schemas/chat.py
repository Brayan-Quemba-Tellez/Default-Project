from typing import Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, ConfigDict


class ChatStart(BaseModel):
    session_id: str
    user_id: Optional[uuid.UUID] = None


class ChatMessageCreate(BaseModel):
    conversation_id: uuid.UUID
    message: str
    sender: str = "user"


class ChatConversationResponse(BaseModel):
    id: uuid.UUID
    session_id: str
    user_id: Optional[uuid.UUID]
    status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class ChatMessageResponse(BaseModel):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender: str
    message: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
