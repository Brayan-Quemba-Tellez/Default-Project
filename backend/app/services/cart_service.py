from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
from decimal import Decimal
import uuid
from app.models.cart import CartItem
from app.models.product import Product


class CartService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_cart(self, user_id: uuid.UUID) -> dict:
        result = await self.session.execute(
            select(CartItem)
            .where(CartItem.user_id == user_id)
            .options(selectinload(CartItem.product))
        )
        items = list(result.scalars().all())

        subtotal = Decimal("0.00")
        for item in items:
            p_price = Decimal(str(item.product.price)) if item.product else Decimal("0.00")
            subtotal += p_price * item.quantity

        return {"items": items, "subtotal": subtotal, "total": subtotal}

    async def add_item(self, product_id: uuid.UUID, quantity: int = 1, user_id: uuid.UUID = None) -> CartItem:
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado")

        product = await self.session.get(Product, product_id)
        if not product or not product.is_available:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Producto no disponible")
        if product.stock_quantity < quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Stock insuficiente")

        result = await self.session.execute(
            select(CartItem).where(CartItem.user_id == user_id, CartItem.product_id == product_id)
        )
        cart_item = result.scalar_one_or_none()

        if cart_item:
            new_qty = cart_item.quantity + quantity
            if product.stock_quantity < new_qty:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Stock insuficiente")
            cart_item.quantity = new_qty
        else:
            cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
            self.session.add(cart_item)

        await self.session.commit()
        await self.session.refresh(cart_item)
        return cart_item

    async def update_quantity(self, id: str, quantity: int, user_id: uuid.UUID = None) -> CartItem:
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado")

        item_uuid = uuid.UUID(id) if isinstance(id, str) else id
        item = await self.session.get(CartItem, item_uuid)
        if not item or item.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ítem no encontrado")

        if quantity <= 0:
            await self.session.delete(item)
            await self.session.commit()
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT)

        # Verificar stock
        product = await self.session.get(Product, item.product_id)
        if product and product.stock_quantity < quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Stock insuficiente")

        item.quantity = quantity
        await self.session.commit()
        await self.session.refresh(item)
        return item

    async def remove_item(self, id: str, user_id: uuid.UUID = None):
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado")

        item_uuid = uuid.UUID(id) if isinstance(id, str) else id
        item = await self.session.get(CartItem, item_uuid)
        if not item or item.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ítem no encontrado")
        await self.session.delete(item)
        await self.session.commit()
