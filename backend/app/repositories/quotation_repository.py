from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.quotation import Quotation
from app.repositories.base import BaseRepository


class QuotationRepository(BaseRepository[Quotation]):
    def __init__(self, session: AsyncSession):
        super().__init__(Quotation, session)

    async def get_with_items(self, quotation_id: UUID) -> Optional[Quotation]:
        result = await self.session.execute(
            select(Quotation).where(Quotation.id == quotation_id).options(selectinload(Quotation.items))
        )
        return result.scalars().first()

    async def get_by_user(self, user_id: UUID) -> List[Quotation]:
        result = await self.session.execute(
            select(Quotation)
            .where(Quotation.user_id == user_id)
            .options(selectinload(Quotation.items))
            .order_by(Quotation.created_at.desc())
        )
        return list(result.scalars().all())
