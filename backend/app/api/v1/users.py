from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from app.core.dependencies import get_current_user
from app.schemas.user import UserBioUpdate
from app.db.session import get_db

router = APIRouter()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

@router.get("/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/me")
def get_logged_in_user_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "bio": current_user.bio,
    }


@router.put("/me")
def update_logged_in_user_profile(
    payload: UserBioUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user = db.query(User).filter(User.id == current_user.id).first()

    user.bio = payload.bio
    db.commit()
    db.refresh(user)

    return {
        "message": "Profile updated successfully",
        "bio": user.bio,
    }