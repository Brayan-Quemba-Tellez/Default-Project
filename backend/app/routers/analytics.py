from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.analytics import AnalyticsEventCreate, DashboardResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter()

@router.post("/event", status_code=status.HTTP_201_CREATED)
async def track_event(event: AnalyticsEventCreate, session: AsyncSession = Depends(get_session)):
    service = AnalyticsService(session)
    await service.track(event)
    return {"detail": "Evento registrado"}

@router.get("/dashboard", response_model=DashboardResponse)
async def dashboard(session: AsyncSession = Depends(get_session)):
    service = AnalyticsService(session)
    return await service.get_dashboard()
