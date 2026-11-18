from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.blog import BlogPost
from app.repositories.base import BaseRepository


class BlogRepository(BaseRepository[BlogPost]):
    def __init__(self, session: AsyncSession):
        super().__init__(BlogPost, session)

    async def get_by_slug(self, slug: str) -> Optional[BlogPost]:
        result = await self.session.execute(select(BlogPost).where(BlogPost.slug == slug))
        return result.scalars().first()

    async def get_published(self, category: Optional[str] = None, skip: int = 0, limit: int = 10) -> List[BlogPost]:
        query = select(BlogPost).where(BlogPost.is_published.is_(True))
        if category:
            query = query.where(BlogPost.category == category)
        query = query.order_by(BlogPost.created_at.desc()).offset(skip).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())
