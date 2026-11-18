import hashlib
import logging
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)


class PaymentService:
    """
    Servicio de integración con la pasarela de pagos Wompi (Colombia).
    Maneja generación de transacciones, links de cobro y validación de webhooks.
    """

    def __init__(self):
        self.api_url = settings.WOMPI_API_URL.rstrip("/")
        self.api_key = settings.WOMPI_API_KEY

    def generate_integrity_signature(self, reference: str, amount_in_cents: int, currency: str = "COP") -> str:
        """
        Calcula la firma de integridad SHA-256 para transacciones Wompi:
        cadena = f"{reference}{amount_in_cents}{currency}{integrity_secret}"
        """
        raw = f"{reference}{amount_in_cents}{currency}{self.api_key}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    async def create_payment_transaction(
        self,
        order_id: str,
        amount_in_cents: int,
        customer_email: str,
        currency: str = "COP",
        redirect_url: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Crea o prepara una sesión de pago para el widget o link de Wompi.
        """
        reference = f"ORD-{order_id}"
        signature = self.generate_integrity_signature(reference, amount_in_cents, currency)

        checkout_data = {
            "reference": reference,
            "amount_in_cents": amount_in_cents,
            "currency": currency,
            "customer_email": customer_email,
            "signature": signature,
            "redirect_url": redirect_url or f"/pedidos/{order_id}?status=processing",
            "checkout_url": f"https://checkout.wompi.co/p/?public-key={self.api_key}&currency={currency}&amount-in-cents={amount_in_cents}&reference={reference}&signature:integrity={signature}",
        }

        # Si hay una llave de API configurada, podemos intentar llamar a Wompi
        if self.api_key and not self.api_key.startswith("pub_test_dummy"):
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    headers = {"Authorization": f"Bearer {self.api_key}"}
                    response = await client.post(
                        f"{self.api_url}/v1/payment_links",
                        json={
                            "name": f"Pago Pedido {order_id}",
                            "description": "Compra en Plataforma PyMEs",
                            "single_use": True,
                            "collect_shipping": False,
                            "currency": currency,
                            "amount_in_cents": amount_in_cents,
                        },
                        headers=headers,
                    )
                    if response.status_code in (200, 201):
                        data = response.json().get("data", {})
                        checkout_data["wompi_payment_link_id"] = data.get("id")
            except Exception as e:
                logger.warning(f"Error conectando con API Wompi: {e}. Usando checkout directo.")

        return checkout_data

    def verify_webhook_checksum(self, properties: list, checksum: str, timestamp: str) -> bool:
        """
        Verifica el checksum del webhook recibido de Wompi.
        """
        if not self.api_key:
            return True  # Modo desarrollo / bypass
        raw = "".join(str(p) for p in properties) + timestamp + self.api_key
        computed = hashlib.sha256(raw.encode("utf-8")).hexdigest()
        return computed == checksum
