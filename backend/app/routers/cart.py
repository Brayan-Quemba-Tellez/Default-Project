from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.cart import CartItemCreate, CartItemResponse, CartResponse
from app.services.cart_service import CartService

router = APIRouter()

@router.get("/", response_model=CartResponse)
async def get_cart(session: AsyncSession = Depends(get_session)):
    service = CartService(session)
    return await service.get_cart()

@router.post("/items", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
async def add_to_cart(item: CartItemCreate, session: AsyncSession = Depends(get_session)):
    service = CartService(session)
    return await service.add_item(item.product_id, item.quantity)

@router.put("/items/{id}", response_model=CartItemResponse)
async def update_cart_item(id: str, quantity: int, session: AsyncSession = Depends(get_session)):
    service = CartService(session)
    return await service.update_quantity(id, quantity)

@router.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_cart_item(id: str, session: AsyncSession = Depends(get_session)):
    service = CartService(session)
    await service.remove_item(id)
