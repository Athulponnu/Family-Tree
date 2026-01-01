from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
import logging

from app.core.security import SECRET_KEY, ALGORITHM
from app.db.session import SessionLocal
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
logger = logging.getLogger(__name__)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    logger.info(f"Attempting to decode token: {token[:50]}...")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.info(f"Token decoded successfully. Payload: {payload}")
        user_id = payload.get("sub")
        if user_id is None:
            logger.error("Token missing 'sub' claim")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token missing user ID")
    except JWTError as e:
        logger.error(f"JWT decode failed: {str(e)}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token: {str(e)}")

    logger.info(f"Looking up user with ID: {user_id}")
    try:
        user_pk = int(user_id)
    except (TypeError, ValueError):
        logger.error(f"Invalid user id in token: {user_id}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user id in token")

    user = db.query(User).filter(User.id == user_pk).first()
    if not user:
        logger.error(f"User with ID {user_id} not found in database")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    logger.info(f"User authenticated: {user.username}")
    return user
