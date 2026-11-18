from typing import Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.consent import DataConsent
from app.repositories.base import BaseRepository


class ConsentRepository(BaseRepository[DataConsent]):
    def __init__(self, session: AsyncSession):
        super().__init__(DataConsent, session)

    async def get_by_user(self, user_id: UUID, consent_type: str) -> Optional[DataConsent]:
        result = await self.session.execute(
            select(DataConsent).where(
                DataConsent.user_id == user_id,
                DataConsent.consent_type == consent_type,
            )
        )
        return result.scalars().first()

    async def get_by_ip(self, ip_address: str, consent_type: str) -> Optional[DataConsent]:
        result = await self.session.execute(
            select(DataConsent).where(
                DataConsent.ip_address == ip_address,
                DataConsent.consent_type == consent_type,
            )
        )
        return result.scalars().first()
