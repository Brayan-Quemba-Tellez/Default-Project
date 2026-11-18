from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, text
from fastapi import HTTPException, status
import uuid
from app.models.analytics import AnalyticsEvent
from app.schemas import AnalyticsEventBase


class AnalyticsService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def track(self, event_data: AnalyticsEventBase, user_id: uuid.UUID = None, ip_address: str = None) -> AnalyticsEvent:
        data = event_data.model_dump() if hasattr(event_data, "model_dump") else event_data.dict()
        event = AnalyticsEvent(
            event_type=data["event_type"],
            user_id=user_id,
            session_id=data.get("session_id"),
            event_data=data.get("event_data") or {},
            ip_address=ip_address,
        )
        self.session.add(event)
        await self.session.commit()
        return event

    async def get_dashboard(self) -> dict:
        # Total de visitas (page_view events)
        visits_result = await self.session.execute(
            select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "page_view")
        )
        total_visits = visits_result.scalar_one() or 0

        # Total leads (contact_form events)
        leads_result = await self.session.execute(
            select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "contact_form")
        )
        total_leads = leads_result.scalar_one() or 0

        return {
            "total_visits": total_visits,
            "total_leads": total_leads,
            "top_products": [],
        }
