from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from fastapi import HTTPException, status
import uuid
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductFilter


class ProductService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_products(self, filters: ProductFilter = None) -> list[Product]:
        query = select(Product).where(Product.is_available == True)

        if filters:
            if filters.search:
                pattern = f"%{filters.search}%"
                query = query.where(
                    or_(Product.name.ilike(pattern), Product.description.ilike(pattern))
                )
            if filters.featured is not None:
                query = query.where(Product.is_featured == filters.featured)
            if filters.min_price is not None:
                query = query.where(Product.price >= filters.min_price)
            if filters.max_price is not None:
                query = query.where(Product.price <= filters.max_price)

            offset = (filters.page - 1) * filters.limit
            query = query.offset(offset).limit(filters.limit)

        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def featured(self) -> list[Product]:
        result = await self.session.execute(
            select(Product)
            .where(Product.is_featured == True, Product.is_available == True)
            .limit(10)
        )
        return list(result.scalars().all())

    async def get_by_slug(self, slug: str) -> Product:
        result = await self.session.execute(select(Product).where(Product.slug == slug))
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado"
            )
        return product

    async def create(self, product_data: ProductCreate, vendor_id: uuid.UUID) -> Product:
        data = product_data.model_dump() if hasattr(product_data, "model_dump") else product_data.dict()
        data["vendor_id"] = vendor_id
        product = Product(**data)
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def update(self, id: str, product_data: ProductUpdate, requester=None) -> Product:
        product_uuid = uuid.UUID(id) if isinstance(id, str) else id
        product = await self.session.get(Product, product_uuid)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado"
            )
        # Verificar que el vendor solo edite sus propios productos
        if requester and requester.role == "vendor" and product.vendor_id != requester.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")

        data = (
            product_data.model_dump(exclude_unset=True)
            if hasattr(product_data, "model_dump")
            else product_data.dict(exclude_unset=True)
        )
        for key, value in data.items():
            if value is not None and hasattr(product, key):
                setattr(product, key, value)

        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def delete(self, id: str, requester=None):
        product_uuid = uuid.UUID(id) if isinstance(id, str) else id
        product = await self.session.get(Product, product_uuid)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado"
            )
        if requester and requester.role == "vendor" and product.vendor_id != requester.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
        await self.session.delete(product)
        await self.session.commit()
