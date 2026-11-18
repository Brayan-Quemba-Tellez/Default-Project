from typing import TypeVar, Generic, Type, Optional, List, Any
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update, delete
from app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """
    Repositorio base asíncrono con operaciones CRUD genéricas para SQLAlchemy 2.0.
    """

    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def get_by_id(self, id: Any) -> Optional[ModelType]:
        """Obtiene una entidad por su clave primaria (UUID o int)."""
        result = await self.session.execute(select(self.model).where(self.model.id == id))
        return result.scalars().first()

    async def list(self, skip: int = 0, limit: int = 100, **filters) -> List[ModelType]:
        """Lista entidades aplicando filtros simples y paginación."""
        query = select(self.model)
        for key, value in filters.items():
            if hasattr(self.model, key) and value is not None:
                query = query.where(getattr(self.model, key) == value)
        query = query.offset(skip).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def count(self, **filters) -> int:
        """Cuenta el número total de registros coincidentes."""
        query = select(func.count(self.model.id))
        for key, value in filters.items():
            if hasattr(self.model, key) and value is not None:
                query = query.where(getattr(self.model, key) == value)
        result = await self.session.execute(query)
        return result.scalar() or 0

    async def create(self, obj: ModelType) -> ModelType:
        """Agrega y persiste una nueva entidad."""
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj

    async def update(self, db_obj: ModelType, update_data: dict) -> ModelType:
        """Actualiza atributos en una entidad existente y la persiste."""
        for field, value in update_data.items():
            if hasattr(db_obj, field) and value is not None:
                setattr(db_obj, field, value)
        await self.session.commit()
        await self.session.refresh(db_obj)
        return db_obj

    async def delete(self, id: Any) -> bool:
        """Elimina una entidad por su clave primaria."""
        obj = await self.get_by_id(id)
        if not obj:
            return False
        await self.session.delete(obj)
        await self.session.commit()
        return True
