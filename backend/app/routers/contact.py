from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import ContactService
from app.dependencies import get_current_admin
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact: ContactCreate,
    session: AsyncSession = Depends(get_session),
):
    """Enviar mensaje de contacto (público)."""
    if not contact.consent_given:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe aceptar políticas de privacidad",
        )
    service = ContactService(session)
    return await service.create(contact)


@router.get("/", response_model=list[ContactResponse])
async def list_contacts(
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Listar mensajes de contacto (solo admin)."""
    service = ContactService(session)
    return await service.list_contacts()
