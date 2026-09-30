from app.tasks import celery_app

@celery_app.task(bind=True, max_retries=3)
def sync_lead_to_crm(self, lead_data: dict):
    pass

@celery_app.task(bind=True, max_retries=3)
def sync_order_to_crm(self, order_data: dict):
    pass
