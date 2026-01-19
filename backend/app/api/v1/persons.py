from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.person import PersonCreate
from app.models.person import Person
from app.models.family_membership import FamilyMembership
from app.models.user import User
from app.core.dependencies import get_current_user
from app.db.session import get_db
from typing import List
from app.models.person import Person


router = APIRouter()

@router.post("/")
def create_person(
    data: PersonCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    membership = db.query(FamilyMembership).filter(
        FamilyMembership.user_id == user.id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="User not in any family")

    person = Person(
        full_name=data.full_name,
        family_id=membership.family_id,
        father_id=data.father_id,
        mother_id=data.mother_id,
        father_name=data.father_name,
        mother_name=data.mother_name
    )

    db.add(person)
    db.commit()
    db.refresh(person)

    return person


@router.get("/")
def list_persons(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    membership = db.query(FamilyMembership).filter(
        FamilyMembership.user_id == user.id
    ).first()

    if not membership:
        raise HTTPException(403, "User not in any family")

    persons = db.query(Person).filter(
        Person.family_id == membership.family_id
    ).all()

    return persons