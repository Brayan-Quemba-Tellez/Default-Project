from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.category import Category
from app.repositories.base import BaseRepository


class CategoryRepository(BaseRepository[Category]):
    def __init__(self, session: AsyncSession):
        super().__init__(Category, session)

    async def get_by_slug(self, slug: str) -> Optional[Category]:
        result = await self.session.execute(select(Category).where(Category.slug == slug))
        return result.scalars().first()

    async def get_by_sector(self, sector: str) -> List[Category]:
        result = await self.session.execute(
            select(Category).where(Category.sector == sector, Category.is_active.is_(True)).order_by(Category.sort_order)
        )
        return list(result.scalars().all())
