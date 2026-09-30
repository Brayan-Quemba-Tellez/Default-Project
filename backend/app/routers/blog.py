from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.services.blog_service import BlogService

router = APIRouter()

@router.get("/", response_model=list[BlogPostResponse])
async def list_posts(category: str = None, page: int = Query(1, ge=1), limit: int = Query(20, ge=1), session: AsyncSession = Depends(get_session)):
    service = BlogService(session)
    return await service.list_posts(category, page, limit)

@router.get("/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str, session: AsyncSession = Depends(get_session)):
    service = BlogService(session)
    return await service.get_by_slug(slug)

@router.post("/", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post: BlogPostCreate, session: AsyncSession = Depends(get_session)):
    service = BlogService(session)
    return await service.create(post)

@router.put("/{id}", response_model=BlogPostResponse)
async def update_post(id: str, post: BlogPostUpdate, session: AsyncSession = Depends(get_session)):
    service = BlogService(session)
    return await service.update(id, post)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(id: str, session: AsyncSession = Depends(get_session)):
    service = BlogService(session)
    await service.delete(id)
