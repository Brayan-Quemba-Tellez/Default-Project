from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.auth import UserCreate, UserResponse, TokenResponse, TokenRefresh
from app.services.auth_service import AuthService
from app.middleware import limiter
from app.config import settings
from fastapi import Request

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def register(user_data: UserCreate, request: Request, session: AsyncSession = Depends(get_session)):
    service = AuthService(session)
    user = await service.register(user_data)
    return user

@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/minute")
async def login(credentials: dict, request: Request, session: AsyncSession = Depends(get_session)):
    service = AuthService(session)
    token_data = await service.login(credentials.get("email"), credentials.get("password"))
    return token_data

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token_data: TokenRefresh, session: AsyncSession = Depends(get_session)):
    service = AuthService(session)
    result = await service.refresh_token(token_data.refresh_token)
    return result

@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(session: AsyncSession = Depends(get_session)):
    service = AuthService(session)
    await service.logout()
    return {"detail": "Sesión cerrada"}
