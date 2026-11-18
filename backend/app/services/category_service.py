from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
import uuid
from app.models.category import Category
from app.schemas import CategoryCreate, CategoryUpdate

class CategoryService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_categories(self, sector: str = None, is_active: bool = True) -> list[Category]:
        query = select(Category).where(Category.is_active == is_active)
        if sector:
            query = query.where(Category.sector == sector)
        query = query.order_by(Category.sort_order.asc(), Category.name.asc())
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> Category:
        result = await self.session.execute(select(Category).where(Category.slug == slug))
        cat = result.scalar_one_or_none()
        if not cat:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")
        return cat

    async def create(self, category_data: CategoryCreate) -> Category:
        data = category_data.model_dump() if hasattr(category_data, "model_dump") else category_data.dict()
        category = Category(**data)
        self.session.add(category)
        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def update(self, id: str, category_data: CategoryUpdate) -> Category:
        category_uuid = uuid.UUID(id) if isinstance(id, str) else id
        category = await self.session.get(Category, category_uuid)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")

        data = category_data.model_dump(exclude_unset=True) if hasattr(category_data, "model_dump") else category_data.dict(exclude_unset=True)
        for key, value in data.items():
            if value is not None and hasattr(category, key):
                setattr(category, key, value)

        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def delete(self, id: str):
        category_uuid = uuid.UUID(id) if isinstance(id, str) else id
        category = await self.session.get(Category, category_uuid)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Categoría no encontrada")
        await self.session.delete(category)
        await self.session.commit()
        return True
