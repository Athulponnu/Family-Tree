import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.family import Family
from app.models.family_membership import FamilyMembership
from app.models.family_invite import FamilyInvite
from app.core.dependencies import get_current_user
from app.core.family_roles import ELDER
from app.models.user import User


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 1️⃣ Create family
@router.post("/")
def create_family(
    family_name: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    family = Family(family_name=family_name)
    db.add(family)
    db.commit()
    db.refresh(family)

    membership = FamilyMembership(
        user_id=user.id,        # ✅ FIXED LINE
        family_id=family.id,
        role=ELDER
    )
    db.add(membership)
    db.commit()
    
    return {
    "family_id": family.id,
    "family_name": family.family_name,
    "role": ELDER
    }



# 2️⃣ Invite member
@router.post("/{family_id}/invite")
def invite_member(
    family_id: int,
    role: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    membership = db.query(FamilyMembership).filter(
        FamilyMembership.family_id == family_id,
        FamilyMembership.user_id == user.id
    ).first()

    if not membership or membership.role != ELDER:
        raise HTTPException(status_code=403, detail="Only elders can invite")

    token = str(uuid.uuid4())

    invite = FamilyInvite(
        family_id=family_id,
        token=token,
        role=role
    )

    db.add(invite)
    db.commit()

    return {"invite_token": token}


# 3️⃣ Join family using invite
@router.post("/join/{token}")
def join_family(
    token: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    invite = db.query(FamilyInvite).filter(
        FamilyInvite.token == token
    ).first()

    if not invite:
        raise HTTPException(status_code=404, detail="Invalid invite")

    membership = FamilyMembership(
        user_id=user.id,
        family_id=invite.family_id,
        role=invite.role
    )

    db.add(membership)
    db.delete(invite)
    db.commit()

    return {"message": "Joined family successfully"}



@router.get("/")
def list_my_families(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    families = (
        db.query(Family)
        .join(FamilyMembership)
        .filter(FamilyMembership.user_id == user.id)
        .all()
    )

    return families