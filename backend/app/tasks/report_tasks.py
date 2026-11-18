from app.tasks import celery_app

@celery_app.task(bind=True)
def generate_report(self, report_type: str):
    pass
