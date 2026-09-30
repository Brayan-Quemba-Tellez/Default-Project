from sqlalchemy import String, Boolean, TEXT, JSONB, TIMESTAMP, UUID, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
import uuid
from app.models.base import Base

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    author_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), unique=True, nullable=False)
    excerpt: Mapped[str | None] = mapped_column(String(500), nullable=True)
    content: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    tags: Mapped[object] = mapped_column(JSONB, server_default="'[]'::jsonb")
    featured_image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    published_at: Mapped[object | None] = mapped_column(TIMESTAMP, nullable=True)
    created_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[object] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    author = relationship("User", back_populates="blog_posts")
