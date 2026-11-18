from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas import ProductCreate, ProductUpdate, ProductResponse, ProductFilter
from app.services.product_service import ProductService
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[ProductResponse])
async def list_products(
    search: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    featured: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    """Listar productos con filtros (público)."""
    filters = ProductFilter(
        search=search,
        min_price=min_price,
        max_price=max_price,
        featured=featured,
        page=page,
        limit=limit,
    )
    service = ProductService(session)
    return await service.list_products(filters)


@router.get("/featured", response_model=list[ProductResponse])
async def featured_products(session: AsyncSession = Depends(get_session)):
    """Productos destacados (público)."""
    service = ProductService(session)
    return await service.featured()


@router.get("/{slug}", response_model=ProductResponse)
async def get_product(slug: str, session: AsyncSession = Depends(get_session)):
    """Obtener producto por slug (público)."""
    service = ProductService(session)
    return await service.get_by_slug(slug)


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Crear producto (solo vendor o admin)."""
    if current_user.role not in ("vendor", "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    service = ProductService(session)
    return await service.create(product, vendor_id=current_user.id)


@router.put("/{id}", response_model=ProductResponse)
async def update_product(
    id: str,
    product: ProductUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Actualizar producto (vendor propietario o admin)."""
    if current_user.role not in ("vendor", "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    service = ProductService(session)
    return await service.update(id, product, requester=current_user)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    id: str,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Eliminar producto (vendor propietario o admin)."""
    if current_user.role not in ("vendor", "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    service = ProductService(session)
    await service.delete(id, requester=current_user)
