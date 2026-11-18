from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from app.models.cart import CartItem
from app.repositories.base import BaseRepository


class CartRepository(BaseRepository[CartItem]):
    def __init__(self, session: AsyncSession):
        super().__init__(CartItem, session)

    async def get_user_items(self, user_id: UUID) -> List[CartItem]:
        result = await self.session.execute(
            select(CartItem)
            .where(CartItem.user_id == user_id)
            .options(selectinload(CartItem.product))
        )
        return list(result.scalars().all())

    async def get_user_item_by_product(self, user_id: UUID, product_id: UUID) -> Optional[CartItem]:
        result = await self.session.execute(
            select(CartItem).where(CartItem.user_id == user_id, CartItem.product_id == product_id)
        )
        return result.scalars().first()

    async def clear_user_cart(self, user_id: UUID) -> bool:
        await self.session.execute(delete(CartItem).where(CartItem.user_id == user_id))
        await self.session.commit()
        return True
