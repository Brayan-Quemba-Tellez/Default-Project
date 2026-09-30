from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ConfigDict

class ChatStart(BaseModel):
    session_id: str
    user_id: Optional[uuid.UUID] = None

class ChatMessage(BaseModel):
    conversation_id: uuid.UUID
    message: str
    sender: str

class ChatResponse(BaseModel):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender: str
    message: str
    created_at: datetime
    bot_response: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class ChatHistoryItem(BaseModel):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender: str
    message: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ConsentCreate(BaseModel):
    consent_type: str
    is_granted: bool

class ConsentResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    consent_type: str
    is_granted: bool
    ip_address: Optional[str]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
