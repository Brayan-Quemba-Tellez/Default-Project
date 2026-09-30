from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import OrderCreate, OrderResponse
from app.services.order_service import OrderService

router = APIRouter()

@router.get("/", response_model=list[OrderResponse])
async def list_orders(session: AsyncSession = Depends(get_session)):
    service = OrderService(session)
    return await service.list_orders()

@router.get("/{id}", response_model=OrderResponse)
async def get_order(id: str, session: AsyncSession = Depends(get_session)):
    service = OrderService(session)
    return await service.get_order(id)

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(order: OrderCreate, session: AsyncSession = Depends(get_session)):
    service = OrderService(session)
    return await service.create(order)

@router.put("/{id}/status", response_model=OrderResponse)
async def update_order_status(id: str, status: dict, session: AsyncSession = Depends(get_session)):
    service = OrderService(session)
    return await service.update_status(id, status["status"])
