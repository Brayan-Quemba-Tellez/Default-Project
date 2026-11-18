from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from datetime import datetime
import re
import uuid
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostUpdate


def _generate_slug(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")


class BlogService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_posts(
        self, category: str = None, page: int = 1, limit: int = 20
    ) -> list[BlogPost]:
        query = select(BlogPost).where(BlogPost.is_published == True)
        if category:
            query = query.where(BlogPost.category == category)
        query = query.order_by(BlogPost.published_at.desc()).offset((page - 1) * limit).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> BlogPost:
        result = await self.session.execute(
            select(BlogPost).where(BlogPost.slug == slug)
        )
        post = result.scalar_one_or_none()
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post no encontrado")
        return post

    async def create(self, post_data: BlogPostCreate, author_id: uuid.UUID) -> BlogPost:
        data = post_data.model_dump() if hasattr(post_data, "model_dump") else post_data.dict()
        base_slug = _generate_slug(data["title"])
        data["slug"] = base_slug
        data["author_id"] = author_id

        if data.get("is_published") and not data.get("published_at"):
            data["published_at"] = datetime.utcnow()

        post = BlogPost(**data)
        self.session.add(post)
        await self.session.commit()
        await self.session.refresh(post)
        return post

    async def update(self, id: str, post_data: BlogPostUpdate) -> BlogPost:
        post_uuid = uuid.UUID(id) if isinstance(id, str) else id
        post = await self.session.get(BlogPost, post_uuid)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post no encontrado")

        data = (
            post_data.model_dump(exclude_unset=True)
            if hasattr(post_data, "model_dump")
            else post_data.dict(exclude_unset=True)
        )
        if data.get("is_published") and not post.published_at:
            data["published_at"] = datetime.utcnow()

        for key, value in data.items():
            if value is not None and hasattr(post, key):
                setattr(post, key, value)

        await self.session.commit()
        await self.session.refresh(post)
        return post

    async def delete(self, id: str):
        post_uuid = uuid.UUID(id) if isinstance(id, str) else id
        post = await self.session.get(BlogPost, post_uuid)
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post no encontrado")
        await self.session.delete(post)
        await self.session.commit()
