from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas import CategoryCreate, CategoryUpdate, CategoryResponse
from app.services.category_service import CategoryService
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[CategoryResponse])
async def list_categories(
    sector: Optional[str] = Query(None),
    is_active: bool = Query(True),
    session: AsyncSession = Depends(get_session),
):
    """Listar categorías con jerarquía (público)."""
    service = CategoryService(session)
    return await service.list_categories(sector, is_active)


@router.get("/{slug}", response_model=CategoryResponse)
async def get_category(slug: str, session: AsyncSession = Depends(get_session)):
    """Obtener categoría por slug (público)."""
    service = CategoryService(session)
    return await service.get_by_slug(slug)


@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    category: CategoryCreate,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Crear categoría (solo admin)."""
    service = CategoryService(session)
    return await service.create(category)


@router.put("/{id}", response_model=CategoryResponse)
async def update_category(
    id: str,
    category: CategoryUpdate,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar categoría (solo admin)."""
    service = CategoryService(session)
    return await service.update(id, category)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    id: str,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Eliminar categoría (solo admin)."""
    service = CategoryService(session)
    await service.delete(id)
