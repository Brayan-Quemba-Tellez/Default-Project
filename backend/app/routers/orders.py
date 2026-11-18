from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from pydantic import BaseModel
from app.database import get_session
from app.schemas import OrderCreate, OrderResponse
from app.services.order_service import OrderService
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()


class OrderStatusUpdate(BaseModel):
    status: str


@router.get("/", response_model=list[OrderResponse])
async def list_orders(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Listar pedidos del usuario autenticado (admin ve todos)."""
    service = OrderService(session)
    user_id = None if current_user.role == "admin" else current_user.id
    return await service.list_orders(user_id=user_id)


@router.get("/{id}", response_model=OrderResponse)
async def get_order(
    id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Obtener detalle de pedido."""
    service = OrderService(session)
    order = await service.get_order(id)
    # Verificar que el pedido pertenece al usuario o es admin
    if current_user.role != "admin" and order.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    return order


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: OrderCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Crear pedido desde el carrito del usuario autenticado."""
    service = OrderService(session)
    return await service.create(order, user_id=current_user.id)


@router.put("/{id}/status", response_model=OrderResponse)
async def update_order_status(
    id: str,
    body: OrderStatusUpdate,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar estado del pedido (solo admin)."""
    service = OrderService(session)
    return await service.update_status(id, body.status)
