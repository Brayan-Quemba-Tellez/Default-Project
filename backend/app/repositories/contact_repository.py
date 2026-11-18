from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.contact import Contact
from app.repositories.base import BaseRepository


class ContactRepository(BaseRepository[Contact]):
    def __init__(self, session: AsyncSession):
        super().__init__(Contact, session)

    async def get_recent(self, limit: int = 50) -> List[Contact]:
        result = await self.session.execute(
            select(Contact).order_by(Contact.created_at.desc()).limit(limit)
        )
        return list(result.scalars().all())
