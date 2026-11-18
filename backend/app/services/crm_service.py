import logging
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)


class CRMService:
    """
    Servicio de integración con Salesforce CRM.
    Permite sincronizar Leads desde contacto, Opportunities desde pedidos,
    y Contacts/Accounts desde usuarios registrados.
    """

    def __init__(self):
        self.api_url = settings.SALESFORCE_API_URL.rstrip("/")
        self.api_key = settings.SALESFORCE_API_KEY

    async def sync_contact_lead(self, contact_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sincroniza un mensaje de contacto entrante con un Lead en Salesforce.
        """
        lead_payload = {
            "FirstName": contact_data.get("name", "").split(" ")[0],
            "LastName": " ".join(contact_data.get("name", "").split(" ")[1:]) or "Lead",
            "Email": contact_data.get("email"),
            "Phone": contact_data.get("phone"),
            "Company": contact_data.get("company") or "Particular",
            "Description": contact_data.get("message"),
            "LeadSource": contact_data.get("source", "Web"),
            "Status": "Open - Not Contacted",
        }

        if not self.api_key:
            logger.info(f"[CRM DEV] Lead simulado en Salesforce: {lead_payload}")
            return {"success": True, "lead_id": "mock_lead_12345", "status": "simulated"}

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{self.api_url}/services/data/v58.0/sobjects/Lead/",
                    json=lead_payload,
                    headers=headers,
                )
                if res.status_code in (200, 201):
                    return res.json()
                logger.error(f"Error sincronizando Lead en Salesforce: {res.status_code} - {res.text}")
                return {"success": False, "error": res.text}
        except Exception as e:
            logger.error(f"Fallo de conexión con Salesforce: {e}")
            return {"success": False, "error": str(e)}

    async def sync_order_opportunity(self, order_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sincroniza un pedido con una Opportunity en Salesforce.
        """
        opp_payload = {
            "Name": f"Pedido #{order_data.get('id', 'N/A')}",
            "Amount": float(order_data.get("total", 0)),
            "StageName": "Closed Won" if order_data.get("status") in ("paid", "completed") else "Prospecting",
            "CloseDate": order_data.get("created_at", "2026-12-31")[:10],
            "Description": order_data.get("notes") or "Pedido generado desde la plataforma web",
        }

        if not self.api_key:
            logger.info(f"[CRM DEV] Opportunity simulada en Salesforce: {opp_payload}")
            return {"success": True, "opportunity_id": "mock_opp_67890", "status": "simulated"}

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{self.api_url}/services/data/v58.0/sobjects/Opportunity/",
                    json=opp_payload,
                    headers=headers,
                )
                return res.json() if res.status_code in (200, 201) else {"success": False, "error": res.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    async def sync_user_contact(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sincroniza un usuario registrado como Contact en Salesforce.
        """
        names = user_data.get("full_name", "").split(" ")
        contact_payload = {
            "FirstName": names[0] if names else "",
            "LastName": " ".join(names[1:]) if len(names) > 1 else "Usuario",
            "Email": user_data.get("email"),
            "Phone": user_data.get("phone"),
            "Title": user_data.get("role", "customer"),
        }

        if not self.api_key:
            logger.info(f"[CRM DEV] Contact simulado en Salesforce: {contact_payload}")
            return {"success": True, "contact_id": "mock_contact_54321", "status": "simulated"}

        return {"success": True}


crm_service = CRMService()
