from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import ContactService

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def contact(contact: ContactCreate, session: AsyncSession = Depends(get_session)):
    service = ContactService(session)
    return await service.create(contact)

@router.get("/", response_model=list[ContactResponse])
async def list_contacts(session: AsyncSession = Depends(get_session)):
    service = ContactService(session)
    return await service.list_contacts()
