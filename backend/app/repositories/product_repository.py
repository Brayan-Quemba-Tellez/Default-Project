from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.product import Product
from app.repositories.base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    def __init__(self, session: AsyncSession):
        super().__init__(Product, session)

    async def get_by_slug(self, slug: str) -> Optional[Product]:
        result = await self.session.execute(select(Product).where(Product.slug == slug))
        return result.scalars().first()

    async def get_featured(self, limit: int = 6) -> List[Product]:
        result = await self.session.execute(
            select(Product).where(Product.is_featured.is_(True), Product.is_available.is_(True)).limit(limit)
        )
        return list(result.scalars().all())

    async def filter_products(
        self,
        category_id: Optional[str] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        skip: int = 0,
        limit: int = 20,
    ) -> List[Product]:
        query = select(Product).where(Product.is_available.is_(True))
        if category_id:
            query = query.where(Product.category_id == category_id)
        if search:
            query = query.where(Product.name.ilike(f"%{search}%"))
        if min_price is not None:
            query = query.where(Product.price >= min_price)
        if max_price is not None:
            query = query.where(Product.price <= max_price)
        query = query.offset(skip).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())
