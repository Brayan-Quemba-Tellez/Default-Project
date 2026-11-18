from datetime import datetime
import uuid
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List

class AnalyticsEventCreate(BaseModel):
    event_type: str
    event_data: Optional[dict] = None
    session_id: Optional[str] = None

class DashboardResponse(BaseModel):
    total_visits: int
    total_leads: int
    top_products: List[dict]
    model_config = ConfigDict(from_attributes=True)
