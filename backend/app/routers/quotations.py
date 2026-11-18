from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.database import get_session
from app.schemas.quotation import QuotationCreate, QuotationResponse
from app.services.quotation_service import QuotationService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


class QuotationStatusUpdate(BaseModel):
    status: str


@router.get("/", response_model=list[QuotationResponse])
async def list_quotations(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Listar cotizaciones del usuario autenticado."""
    service = QuotationService(session)
    return await service.list_quotations(user_id=current_user.id)


@router.get("/{id}", response_model=QuotationResponse)
async def get_quotation(
    id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Obtener cotización por ID."""
    service = QuotationService(session)
    quotation = await service.get_quotation(id)
    if current_user.role != "admin" and quotation.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    return quotation


@router.post("/", response_model=QuotationResponse, status_code=status.HTTP_201_CREATED)
async def create_quotation(
    quotation: QuotationCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Solicitar cotización."""
    service = QuotationService(session)
    return await service.create(quotation, user_id=current_user.id)


@router.put("/{id}/status", response_model=QuotationResponse)
async def update_quotation_status(
    id: str,
    body: QuotationStatusUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar estado de cotización."""
    service = QuotationService(session)
    return await service.update_status(id, body.status, user_id=current_user.id)
