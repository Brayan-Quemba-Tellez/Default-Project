from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.services.blog_service import BlogService
from app.dependencies import get_current_admin
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[BlogPostResponse])
async def list_posts(
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    """Listar posts del blog (público)."""
    service = BlogService(session)
    return await service.list_posts(category, page, limit)


@router.get("/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str, session: AsyncSession = Depends(get_session)):
    """Obtener post por slug (público)."""
    service = BlogService(session)
    return await service.get_by_slug(slug)


@router.post("/", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post: BlogPostCreate,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Crear post (solo admin)."""
    service = BlogService(session)
    return await service.create(post, author_id=current_user.id)


@router.put("/{id}", response_model=BlogPostResponse)
async def update_post(
    id: str,
    post: BlogPostUpdate,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar post (solo admin)."""
    service = BlogService(session)
    return await service.update(id, post)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    id: str,
    current_user: User = Depends(get_current_admin),
    session: AsyncSession = Depends(get_session),
):
    """Eliminar post (solo admin)."""
    service = BlogService(session)
    await service.delete(id)
