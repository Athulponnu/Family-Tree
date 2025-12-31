import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.family import Family
from app.models.family_membership import FamilyMembership
from app.models.family_invite import FamilyInvite
from app.core.dependencies import get_current_user
from app.core.family_roles import ELDER
from app.schemas.family import FamilyCreate

router = APIRouter(prefix="/families", tags=["Families"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔴 THIS DECORATOR MUST BE EXACTLY "/"
@router.post("/")
def create_family(
    payload: FamilyCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    family = Family(family_name=payload.family_name)
    db.add(family)
    db.commit()
    db.refresh(family)

    membership = FamilyMembership(
        user_id=user["sub"],
        family_id=family.id,
        role=ELDER
    )
    db.add(membership)
    db.commit()

    return family

@router.post("/{family_id}/invite")
def invite_member(
    family_id: int,
    role: str,
    db: Session = Depends(get_db)
):
    token = str(uuid.uuid4())
    invite = FamilyInvite(
        family_id=family_id,
        token=token,
        role=role
    )
    db.add(invite)
    db.commit()
    return {"invite_token": token}
