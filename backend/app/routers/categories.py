from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import CategoryCreate, CategoryUpdate, CategoryResponse, ProductCreate, ProductUpdate, ProductResponse, ProductFilter
from app.services.category_service import CategoryService
from app.services.product_service import ProductService

router = APIRouter()

@router.get("/", response_model=list[CategoryResponse])
async def list_categories(sector: str = None, is_active: bool = True, session: AsyncSession = Depends(get_session)):
    service = CategoryService(session)
    return await service.list_categories(sector, is_active)

@router.get("/{slug}", response_model=CategoryResponse)
async def get_category(slug: str, session: AsyncSession = Depends(get_session)):
    service = CategoryService(session)
    return await service.get_by_slug(slug)

@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(category: CategoryCreate, session: AsyncSession = Depends(get_session)):
    service = CategoryService(session)
    return await service.create(category)

@router.put("/{id}", response_model=CategoryResponse)
async def update_category(id: str, category: CategoryUpdate, session: AsyncSession = Depends(get_session)):
    service = CategoryService(session)
    return await service.update(id, category)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(id: str, session: AsyncSession = Depends(get_session)):
    service = CategoryService(session)
    await service.delete(id)

@router.get("/", response_model=list[ProductResponse])
async def list_products(filters: ProductFilter = Depends(), session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    return await service.list_products(filters)

@router.get("/featured", response_model=list[ProductResponse])
async def featured_products(session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    return await service.featured()

@router.get("/{slug}", response_model=ProductResponse)
async def get_product(slug: str, session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    return await service.get_by_slug(slug)

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate, session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    return await service.create(product)

@router.put("/{id}", response_model=ProductResponse)
async def update_product(id: str, product: ProductUpdate, session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    return await service.update(id, product)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(id: str, session: AsyncSession = Depends(get_session)):
    service = ProductService(session)
    await service.delete(id)
