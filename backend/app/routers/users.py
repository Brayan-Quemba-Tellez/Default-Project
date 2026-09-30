from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import UserCreate, UserUpdate, UserResponse
from app.services.user_service import UserService
from app.middleware import limiter

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_me(session: AsyncSession = Depends(get_session)):
    service = UserService(session)
    return await service.get_profile()

@router.put("/me", response_model=UserResponse)
async def update_me(user_data: UserUpdate, session: AsyncSession = Depends(get_session)):
    service = UserService(session)
    return await service.update_profile(user_data)
