from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
import uuid

class BlogPostBase(BaseModel):
    title: str
    content: str
    category: str
    excerpt: Optional[str] = None
    tags: List[str] = []
    featured_image: Optional[str] = None
    is_published: bool = False

class BlogPostCreate(BaseModel):
    title: str
    content: str
    category: str
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = []
    featured_image: Optional[str] = None
    is_published: Optional[bool] = False

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    is_published: Optional[bool] = None

class BlogPostResponse(BaseModel):
    id: uuid.UUID
    author_id: uuid.UUID
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    category: str
    tags: List[str]
    featured_image: Optional[str]
    is_published: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
