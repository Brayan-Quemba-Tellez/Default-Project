from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas import AnalyticsEventBase as AnalyticsEventCreate, DashboardResponse
from app.services.analytics_service import AnalyticsService
from app.dependencies import get_current_admin
from app.models.user import User

router = APIRouter()


@router.post("/event", status_code=status.HTTP_201_CREATED)
async def track_event(
    event: AnalyticsEventCreate,
    session: AsyncSession = Depends(get_session),
):
    """Registrar evento de analytics (público)."""
    service = AnalyticsService(session)
    await service.track(event)
    return {"detail": "Evento registrado"}


@router.get("/dashboard", response_model=DashboardResponse)
async def dashboard(
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Dashboard de analytics (solo admin)."""
    service = AnalyticsService(session)
    return await service.get_dashboard()
