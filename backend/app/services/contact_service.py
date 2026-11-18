from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models.contact import Contact
from app.schemas.contact import ContactCreate


class ContactService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, contact_data: ContactCreate) -> Contact:
        data = contact_data.model_dump() if hasattr(contact_data, "model_dump") else contact_data.dict()
        # El campo consent_given es de schema, no del modelo
        data.pop("consent_given", None)
        contact = Contact(**data, status="new")
        self.session.add(contact)
        await self.session.commit()
        await self.session.refresh(contact)
        return contact

    async def list_contacts(self, page: int = 1, limit: int = 20) -> list[Contact]:
        query = select(Contact).order_by(Contact.created_at.desc()).offset((page - 1) * limit).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def update_status(self, id: str, new_status: str) -> Contact:
        import uuid
        contact_uuid = uuid.UUID(id) if isinstance(id, str) else id
        contact = await self.session.get(Contact, contact_uuid)
        if not contact:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contacto no encontrado")
        contact.status = new_status
        await self.session.commit()
        await self.session.refresh(contact)
        return contact
