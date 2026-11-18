from datetime import datetime, date, time, timedelta
from typing import List, Optional


DEFAULT_START_HOUR = 8
DEFAULT_END_HOUR = 18
DEFAULT_SLOT_MINUTES = 60


def is_future_date(d: date) -> bool:
    """Verifica si una fecha es igual o posterior a hoy."""
    return d >= date.today()


def generate_time_slots(
    target_date: date,
    booked_times: Optional[List[time]] = None,
    slot_minutes: int = DEFAULT_SLOT_MINUTES,
    start_hour: int = DEFAULT_START_HOUR,
    end_hour: int = DEFAULT_END_HOUR,
) -> List[str]:
    """
    Genera franjas horarias disponibles para una fecha específica.
    Excluye franjas ya reservadas y franjas pasadas si la fecha es hoy.
    """
    booked_set = {t.strftime("%H:%M") for t in (booked_times or [])}
    slots: List[str] = []
    
    current_datetime = datetime.combine(target_date, time(hour=start_hour, minute=0))
    end_datetime = datetime.combine(target_date, time(hour=end_hour, minute=0))
    now = datetime.now()

    while current_datetime < end_datetime:
        slot_str = current_datetime.strftime("%H:%M")
        
        # Si la fecha es hoy, omitir horas pasadas
        if target_date == date.today() and current_datetime <= now:
            current_datetime += timedelta(minutes=slot_minutes)
            continue
            
        if slot_str not in booked_set:
            slots.append(slot_str)
            
        current_datetime += timedelta(minutes=slot_minutes)

    return slots


def parse_date(date_str: str) -> Optional[date]:
    """Convierte cadena YYYY-MM-DD en objeto date."""
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return None
