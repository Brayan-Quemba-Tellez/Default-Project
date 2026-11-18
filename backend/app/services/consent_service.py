from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status, Request
import uuid
from app.models.consent import DataConsent
from app.schemas import ConsentBase


class ConsentService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_consent(self, consent_data: ConsentBase, user_id: uuid.UUID, ip_address: str = None) -> DataConsent:
        data = consent_data.model_dump() if hasattr(consent_data, "model_dump") else consent_data.dict()

        # Actualizar si ya existe consentimiento del mismo tipo
        existing = await self.session.execute(
            select(DataConsent).where(
                DataConsent.user_id == user_id,
                DataConsent.consent_type == data["consent_type"],
            )
        )
        record = existing.scalar_one_or_none()

        if record:
            record.is_granted = data["is_granted"]
            await self.session.commit()
            await self.session.refresh(record)
            return record

        consent = DataConsent(
            user_id=user_id,
            consent_type=data["consent_type"],
            is_granted=data["is_granted"],
            ip_address=ip_address,
        )
        self.session.add(consent)
        await self.session.commit()
        await self.session.refresh(consent)
        return consent

    async def list_consents(self, user_id: uuid.UUID) -> list[DataConsent]:
        result = await self.session.execute(
            select(DataConsent).where(DataConsent.user_id == user_id)
        )
        return list(result.scalars().all())
