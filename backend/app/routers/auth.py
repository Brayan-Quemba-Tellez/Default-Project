from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.database import get_session
from app.schemas.auth import UserCreate, UserResponse, TokenResponse, TokenRefresh
from app.services.auth_service import AuthService
from app.dependencies import get_current_user
from app.middleware import limiter
from app.models.user import User

router = APIRouter()


class LoginCredentials(BaseModel):
    email: str
    password: str


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def register(
    user_data: UserCreate,
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    """Registrar nuevo usuario."""
    service = AuthService(session)
    return await service.register(user_data)


@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/minute")
async def login(
    credentials: LoginCredentials,
    request: Request,
    session: AsyncSession = Depends(get_session),
):
    """Inicio de sesión. Retorna access_token y refresh_token."""
    service = AuthService(session)
    return await service.login(credentials.email, credentials.password)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    token_data: TokenRefresh,
    session: AsyncSession = Depends(get_session),
):
    """Renovar access token mediante refresh token."""
    service = AuthService(session)
    return await service.refresh_token(token_data.refresh_token)


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(
    current_user: User = Depends(get_current_user),
):
    """Cerrar sesión. Requiere token válido en Authorization header."""
    # Con Redis implementado: agregar token a blacklist aquí
    # Por ahora el cliente debe descartar el token localmente
    return {"detail": "Sesión cerrada"}
