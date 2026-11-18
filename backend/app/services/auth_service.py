from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
import uuid
from app.models.user import User
from app.schemas.auth import UserCreate
from app.utils.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token, create_password_reset_token
from app.config import settings

class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def forgot_password(self, email: str) -> dict:
        result = await self.session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if not user:
            return {
                "message": "Si el correo está registrado, recibirás un enlace de recuperación.",
                "reset_token": None,
            }

        token = create_password_reset_token({"sub": str(user.id), "email": user.email})
        return {
            "message": "Instrucciones de recuperación generadas exitosamente.",
            "reset_token": token,
        }

    async def reset_password(self, token: str, new_password: str) -> dict:
        try:
            payload = decode_token(token)
            if payload.get("purpose") != "password_reset":
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail="Token no válido para restablecer contraseña"
                )
            user_id = uuid.UUID(payload.get("sub"))
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="El token de recuperación es inválido o ha expirado"
            )

        user = await self.session.get(User, user_id)
        if not user or not user.is_active:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

        user.password_hash = hash_password(new_password)
        await self.session.commit()
        return {"message": "Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión."}

    async def register(self, user_data: UserCreate) -> User:
        # Verificar duplicados por email
        existing_email = await self.session.execute(select(User).where(User.email == user_data.email))
        if existing_email.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo electrónico ya se encuentra registrado."
            )

        # Verificar duplicados por documento
        existing_doc = await self.session.execute(
            select(User).where(User.document_number == user_data.document_number)
        )
        if existing_doc.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El número de documento ya está registrado."
            )

        user = User(
            email=user_data.email,
            password_hash=hash_password(user_data.password),
            full_name=user_data.full_name,
            phone=user_data.phone,
            document_type=user_data.document_type,
            document_number=user_data.document_number,
            role="customer",
            is_active=True,
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def login(self, email: str, password: str) -> dict:
        result = await self.session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales incorrectas."
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Usuario inactivo."
            )

        token_payload = {"sub": str(user.id), "email": user.email, "role": user.role}
        access_token = create_access_token(token_payload)
        refresh_token = create_refresh_token(token_payload)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": user,
        }

    async def refresh_token(self, refresh_token_str: str) -> dict:
        try:
            payload = decode_token(refresh_token_str)
            if payload.get("type") != "refresh":
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no es de tipo refresh")
            user_id = uuid.UUID(payload.get("sub"))
        except Exception:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token inválido o expirado")

        user = await self.session.get(User, user_id)
        if not user or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado")

        token_payload = {"sub": str(user.id), "email": user.email, "role": user.role}
        access_token = create_access_token(token_payload)
        new_refresh = create_refresh_token(token_payload)

        return {
            "access_token": access_token,
            "refresh_token": new_refresh,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": user,
        }

    async def logout(self):
        return True
