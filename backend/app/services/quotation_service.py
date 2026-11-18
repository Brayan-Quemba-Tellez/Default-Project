from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
from decimal import Decimal
import uuid
from app.models.quotation import Quotation, QuotationItem
from app.schemas.quotation import QuotationCreate


class QuotationService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_quotations(self, user_id: uuid.UUID = None) -> list[Quotation]:
        query = select(Quotation).options(selectinload(Quotation.items))
        if user_id:
            query = query.where(Quotation.user_id == user_id)
        query = query.order_by(Quotation.created_at.desc())
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_quotation(self, id: str) -> Quotation:
        q_uuid = uuid.UUID(id) if isinstance(id, str) else id
        query = select(Quotation).where(Quotation.id == q_uuid).options(selectinload(Quotation.items))
        result = await self.session.execute(query)
        quotation = result.scalar_one_or_none()
        if not quotation:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cotización no encontrada")
        return quotation

    async def create(self, quotation_data: QuotationCreate, user_id: uuid.UUID) -> Quotation:
        data = quotation_data.model_dump() if hasattr(quotation_data, "model_dump") else quotation_data.dict()
        items_data = data.pop("items", [])

        quotation_items = []
        subtotal = Decimal("0.00")
        for item in items_data:
            qty = item.get("quantity", 1)
            price = Decimal(str(item.get("unit_price", 0)))
            total = price * qty
            subtotal += total
            quotation_items.append(QuotationItem(
                description=item.get("description", ""),
                quantity=qty,
                unit_price=price,
                total_price=total,
            ))

        tax = subtotal * Decimal("0.19")
        total = subtotal + tax

        quotation = Quotation(
            user_id=user_id,
            status="draft",
            subtotal=subtotal,
            tax=tax,
            total=total,
            notes=data.get("notes"),
            items=quotation_items,
        )
        self.session.add(quotation)
        await self.session.commit()
        await self.session.refresh(quotation)
        return quotation

    async def update_status(self, id: str, new_status: str, user_id: uuid.UUID = None) -> Quotation:
        quotation = await self.get_quotation(id)
        if user_id and quotation.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
        quotation.status = new_status
        await self.session.commit()
        await self.session.refresh(quotation)
        return quotation
