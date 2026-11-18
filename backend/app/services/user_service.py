from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
import uuid
from app.models.user import User
from app.schemas import UserUpdate


class UserService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_profile(self, user_id: uuid.UUID) -> User:
        """Obtener usuario por ID. Siempre requiere un UUID válido."""
        user = await self.session.get(User, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado",
            )
        return user

    async def update_profile(self, user_data: UserUpdate, user_id: uuid.UUID) -> User:
        """Actualizar perfil de usuario."""
        user = await self.get_profile(user_id)

        update_data = (
            user_data.model_dump(exclude_unset=True)
            if hasattr(user_data, "model_dump")
            else user_data.dict(exclude_unset=True)
        )

        # Verificar email único si se está cambiando
        if "email" in update_data and update_data["email"] != user.email:
            existing = await self.session.execute(
                select(User).where(User.email == update_data["email"])
            )
            if existing.scalar_one_or_none():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email ya en uso",
                )

        for key, val in update_data.items():
            if val is not None and hasattr(user, key):
                setattr(user, key, val)

        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def list_users(self) -> list[User]:
        """Listar todos los usuarios (solo admin)."""
        result = await self.session.execute(select(User).order_by(User.created_at.desc()))
        return list(result.scalars().all())

    async def set_active(self, user_id: uuid.UUID, is_active: bool) -> User:
        """Activar o desactivar un usuario."""
        user = await self.get_profile(user_id)
        user.is_active = is_active
        await self.session.commit()
        await self.session.refresh(user)
        return user
