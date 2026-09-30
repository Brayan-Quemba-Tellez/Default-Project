from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ConfigDict

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str
    source: Optional[str] = None
    consent_given: bool = True

class ContactResponse(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    message: str
    source: Optional[str]
    status: str
    salesforce_id: Optional[str]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
