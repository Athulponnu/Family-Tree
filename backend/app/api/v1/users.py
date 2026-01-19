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

@router.get("/me/person")
def get_my_person(
    user: User = Depends(get_current_user)
):
    return user.person


@router.post("/me/person")
def create_my_person(
    full_name: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.person_id:
        raise HTTPException(400, "User already linked to a person")

    membership = db.query(FamilyMembership).filter(
        FamilyMembership.user_id == user.id
    ).first()

    person = Person(
        full_name=full_name,
        family_id=membership.family_id
    )

    db.add(person)
    db.commit()
    db.refresh(person)

    user.person_id = person.id
    db.commit()

    return person


@router.put("/me/person/parents")
def update_my_parents(
    father_id: int | None = None,
    mother_id: int | None = None,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not user.person:
        raise HTTPException(400, "User has no person")

    if father_id:
        user.person.father_id = father_id
    if mother_id:
        user.person.mother_id = mother_id

    db.commit()
    db.refresh(user.person)

    return user.person
