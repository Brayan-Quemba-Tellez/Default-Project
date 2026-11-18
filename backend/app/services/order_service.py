from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
from decimal import Decimal
import uuid
from app.models.order import Order, OrderItem
from app.models.cart import CartItem
from app.models.product import Product
from app.schemas import OrderCreate


class OrderService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_orders(self, user_id: uuid.UUID = None) -> list[Order]:
        query = select(Order).options(
            selectinload(Order.items).selectinload(OrderItem.product)
        )
        if user_id:
            query = query.where(Order.user_id == user_id)
        query = query.order_by(Order.created_at.desc())
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_order(self, id: str) -> Order:
        order_uuid = uuid.UUID(id) if isinstance(id, str) else id
        query = select(Order).where(Order.id == order_uuid).options(
            selectinload(Order.items).selectinload(OrderItem.product)
        )
        result = await self.session.execute(query)
        order = result.scalar_one_or_none()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Pedido no encontrado"
            )
        return order

    async def create(self, order_data: OrderCreate, user_id: uuid.UUID) -> Order:
        data = order_data.model_dump() if hasattr(order_data, "model_dump") else order_data.dict()

        # Obtener items del carrito de la base de datos
        cart_result = await self.session.execute(
            select(CartItem)
            .where(CartItem.user_id == user_id)
            .options(selectinload(CartItem.product))
        )
        cart_items = list(cart_result.scalars().all())

        subtotal = Decimal("0.00")
        order_items = []

        if cart_items:
            for ci in cart_items:
                if not ci.product or not ci.product.is_available:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Producto no disponible",
                    )
                unit_price = Decimal(str(ci.product.price))
                item_total = unit_price * ci.quantity
                subtotal += item_total
                order_items.append(
                    OrderItem(
                        product_id=ci.product_id,
                        quantity=ci.quantity,
                        unit_price=unit_price,
                        total_price=item_total,
                    )
                )
        elif data.get("items"):
            # Si el carrito se manejó en cliente (localStorage), procesar items enviados
            for item in data.get("items"):
                raw_pid = item.get("product_id")
                try:
                    p_uuid = uuid.UUID(str(raw_pid))
                except (ValueError, TypeError):
                    continue
                product = await self.session.get(Product, p_uuid)
                quantity = int(item.get("quantity", 1))
                if product:
                    unit_price = Decimal(str(product.price))
                else:
                    unit_price = Decimal(str(item.get("unit_price", 0)))
                item_total = unit_price * quantity
                subtotal += item_total
                order_items.append(
                    OrderItem(
                        product_id=p_uuid,
                        quantity=quantity,
                        unit_price=unit_price,
                        total_price=item_total,
                    )
                )
        
        if not order_items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="El carrito está vacío o no tiene productos válidos"
            )

        tax = subtotal * Decimal("0.19")
        total = subtotal + tax

        order = Order(
            user_id=user_id,
            status="pending",
            subtotal=subtotal,
            tax=tax,
            total=total,
            shipping_address=data.get("shipping_address", {}),
            payment_method=data.get("payment_method", "wompi"),
            payment_status="pending",
            notes=data.get("notes"),
            items=order_items,
        )
        self.session.add(order)

        # Limpiar carrito de BD si existía
        for ci in cart_items:
            await self.session.delete(ci)

        await self.session.commit()
        
        # Recargar con items
        reloaded = await self.session.execute(
            select(Order).where(Order.id == order.id).options(
                selectinload(Order.items).selectinload(OrderItem.product)
            )
        )
        return reloaded.scalar_one()

    async def update_status(self, id: str, new_status: str) -> Order:
        order = await self.get_order(id)
        allowed = {"pending", "confirmed", "shipped", "delivered", "cancelled"}
        if new_status not in allowed:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Estado inválido. Permitidos: {', '.join(allowed)}",
            )
        order.status = new_status
        await self.session.commit()
        await self.session.refresh(order)
        return order
