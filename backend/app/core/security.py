from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from pathlib import Path
from dotenv import load_dotenv

# Ensure environment variables from backend/.env are loaded when this module imports
BASE_DIR = Path(__file__).resolve().parents[2]
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError(f"SECRET_KEY not found. Checked: {ENV_PATH}")

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password[:72], hashed_password)

def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(days=1)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
