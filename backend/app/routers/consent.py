from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.chat import ConsentCreate, ConsentResponse
from app.services.consent_service import ConsentService

router = APIRouter()

@router.post("/", response_model=ConsentResponse, status_code=status.HTTP_201_CREATED)
async def consent(consent_data: ConsentCreate, session: AsyncSession = Depends(get_session)):
    service = ConsentService(session)
    return await service.create_consent(consent_data)

@router.get("/", response_model=list[ConsentResponse])
async def list_consents(session: AsyncSession = Depends(get_session)):
    service = ConsentService(session)
    return await service.list_consents()
