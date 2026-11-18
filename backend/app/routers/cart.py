from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.database import get_session
from app.schemas.cart import CartItemCreate, CartItemResponse, CartResponse
from app.services.cart_service import CartService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


class CartItemUpdate(BaseModel):
    quantity: int


@router.get("/", response_model=CartResponse)
async def get_cart(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Obtener carrito del usuario autenticado."""
    service = CartService(session)
    return await service.get_cart(user_id=current_user.id)


@router.post("/items", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
async def add_to_cart(
    item: CartItemCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Agregar item al carrito."""
    service = CartService(session)
    return await service.add_item(item.product_id, item.quantity, user_id=current_user.id)


@router.put("/items/{id}", response_model=CartItemResponse)
async def update_cart_item(
    id: str,
    body: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar cantidad de un item del carrito."""
    service = CartService(session)
    return await service.update_quantity(id, body.quantity, user_id=current_user.id)


@router.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_cart_item(
    id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Eliminar item del carrito."""
    service = CartService(session)
    await service.remove_item(id, user_id=current_user.id)
