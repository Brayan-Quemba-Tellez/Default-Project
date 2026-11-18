from app.tasks import celery_app

@celery_app.task(bind=True, max_retries=3)
def track_analytics_event(self, event_data: dict):
    pass

@celery_app.task(bind=True)
def generate_daily_report(self):
    pass
