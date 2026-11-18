from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import ConsentBase as ConsentCreate, ConsentResponse
from app.services.consent_service import ConsentService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=ConsentResponse, status_code=status.HTTP_201_CREATED)
async def create_consent(
    consent_data: ConsentCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Registrar consentimiento del usuario autenticado."""
    service = ConsentService(session)
    return await service.create_consent(consent_data, user_id=current_user.id)


@router.get("/", response_model=list[ConsentResponse])
async def list_consents(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Obtener consentimientos del usuario autenticado."""
    service = ConsentService(session)
    return await service.list_consents(user_id=current_user.id)
