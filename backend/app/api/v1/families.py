import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.family import Family
from app.models.family_membership import FamilyMembership
from app.models.family_invite import FamilyInvite
from app.core.dependencies import get_current_user
from app.core.family_roles import ELDER
from app.models.user import User

router = APIRouter()


# 1️⃣ Create family
@router.post("/")
def create_family(
    family_name: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    family = Family(family_name=family_name)
    db.add(family)
    db.commit()
    db.refresh(family)

    membership = FamilyMembership(
        user_id=user.id,
        family_id=family.id,
        role=ELDER,
    )
    db.add(membership)
    db.commit()

    return {
        "family_id": family.id,
        "family_name": family.family_name,
        "role": ELDER,
    }


# 2️⃣ Invite member
@router.post("/{family_id}/invite")
def invite_member(
    family_id: int,
    role: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    membership = (
        db.query(FamilyMembership)
        .filter(
            FamilyMembership.family_id == family_id,
            FamilyMembership.user_id == user.id,
        )
        .first()
    )

    if not membership or membership.role != ELDER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only elders can invite",
        )

    invite = FamilyInvite(
        family_id=family_id,
        token=str(uuid.uuid4()),
        role=role,
    )

    db.add(invite)
    db.commit()
    db.refresh(invite)

    return {
        "invite_token": invite.token,
        "expires_at": invite.expires_at,
    }


# 3️⃣ Join family using invite
@router.post("/join/{token}")
def join_family(
    token: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    invite = (
        db.query(FamilyInvite)
        .filter(FamilyInvite.token == token)
        .first()
    )

    if not invite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid invite",
        )

    membership = FamilyMembership(
        user_id=user.id,
        family_id=invite.family_id,
        role=invite.role,
    )

    db.add(membership)
    db.delete(invite)
    db.commit()

    return {"message": "Joined family successfully"}


# 4️⃣ List my families
@router.get("/")
def list_my_families(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    families = (
        db.query(Family)
        .join(FamilyMembership)
        .filter(FamilyMembership.user_id == user.id)
        .all()
    )

    return families


# 5️⃣ Get family tree
@router.get("/{family_id}/tree")
def get_family_tree(
    family_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    membership = (
        db.query(FamilyMembership)
        .filter(
            FamilyMembership.user_id == current_user.id,
            FamilyMembership.family_id == family_id,
        )
        .first()
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this family",
        )

    family = (
        db.query(Family)
        .filter(Family.id == family_id)
        .first()
    )

    if not family:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Family not found",
        )

    members = (
        db.query(User)
        .join(FamilyMembership)
        .filter(FamilyMembership.family_id == family_id)
        .all()
    )

    nodes = []

    for user in members:
        primary = (
            db.query(FamilyMembership)
            .filter(
                FamilyMembership.user_id == user.id,
                FamilyMembership.family_id == family_id,
            )
            .first()
        )

        secondary = (
            db.query(FamilyMembership)
            .join(Family)
            .filter(
                FamilyMembership.user_id == user.id,
                FamilyMembership.family_id != family_id,
            )
            .all()
        )

        nodes.append({
            "user_id": user.id,
            "name": user.username,

            "profile": {
                "email": user.email,
                "bio": user.bio,
            },

            "primary_membership": {
                "family_id": family.id,
                "family_name": family.family_name,
                "role": primary.role,
                "relation": getattr(primary, "relation_type", None),
            },

            "secondary_memberships": [
                {
                    "family_id": m.family.id,
                    "family_name": m.family.family_name,
                    "relation": getattr(m, "relation_type", None),
                }
                for m in secondary
            ],

            "parents": [],
            "children": [],
        })

    return {
        "family": {
            "id": family.id,
            "name": family.family_name,
        },
        "nodes": nodes,
    }
