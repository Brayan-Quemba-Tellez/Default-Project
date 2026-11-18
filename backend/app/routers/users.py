from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import UserUpdate, UserResponse
from app.services.user_service import UserService
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Obtener perfil del usuario autenticado."""
    service = UserService(session)
    return await service.get_profile(current_user.id)


@router.put("/me", response_model=UserResponse)
async def update_me(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar perfil del usuario autenticado."""
    service = UserService(session)
    return await service.update_profile(user_data, current_user.id)


@router.get("/{id}", response_model=UserResponse)
async def get_user_by_id(
    id: str,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Obtener usuario por ID (solo admin)."""
    import uuid
    try:
        user_uuid = uuid.UUID(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID inválido")
    service = UserService(session)
    return await service.get_profile(user_uuid)
