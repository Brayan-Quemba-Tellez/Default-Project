from dataclasses import dataclass
from typing import Optional
from datetime import date

@dataclass
class PaginationParams:
    page: int = 1
    limit: int = 20
    offset: int = 0

    def __post_init__(self):
        self.offset = (self.page - 1) * self.limit

@dataclass
class PaginatedResult:
    items: list
    total: int
    page: int
    pages: int

    @classmethod
    def from_query(cls, items: list, total: int, page: int, limit: int) -> "PaginatedResult":
        pages = (total + limit - 1) // limit if limit > 0 else 1
        return cls(items=items, total=total, page=page, pages=pages)

PaginatedResponse = PaginatedResult

def paginate(items: list, total: int, page: int = 1, limit: int = 20) -> PaginatedResult:
    return PaginatedResult.from_query(items, total, page, limit)

def generate_slug(name: str) -> str:
    return name.lower().replace(" ", "-").replace("_", "-")[:100]
