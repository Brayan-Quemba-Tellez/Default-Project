from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.quotation import QuotationCreate, QuotationUpdate, QuotationResponse
from app.services.quotation_service import QuotationService

router = APIRouter()

@router.get("/", response_model=list[QuotationResponse])
async def list_quotations(session: AsyncSession = Depends(get_session)):
    service = QuotationService(session)
    return await service.list_quotations()

@router.get("/{id}", response_model=QuotationResponse)
async def get_quotation(id: str, session: AsyncSession = Depends(get_session)):
    service = QuotationService(session)
    return await service.get_quotation(id)

@router.post("/", response_model=QuotationResponse, status_code=status.HTTP_201_CREATED)
async def create_quotation(quotation: QuotationCreate, session: AsyncSession = Depends(get_session)):
    service = QuotationService(session)
    return await service.create(quotation)

@router.put("/{id}/status", response_model=QuotationResponse)
async def update_quotation_status(id: str, status: dict, session: AsyncSession = Depends(get_session)):
    service = QuotationService(session)
    return await service.update_status(id, status["status"])
