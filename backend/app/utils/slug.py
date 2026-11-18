import re
import unicodedata


def generate_slug(text: str) -> str:
    """
    Genera un slug normalizado apto para URLs a partir de una cadena de texto.
    Elimina tildes, caracteres especiales y convierte espacios a guiones.
    """
    if not text:
        return ""
    # Normalizar caracteres unicode (remover acentos)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    # Convertir a minúsculas y reemplazar caracteres no alfanuméricos por guiones
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text
