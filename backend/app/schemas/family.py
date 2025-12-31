from pydantic import BaseModel, Field
from typing import Optional

# =========================
# Request Schemas
# =========================

class FamilyCreate(BaseModel):
    family_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        example="Kasthuri"
    )


class FamilyInviteCreate(BaseModel):
    role: str = Field(
        ...,
        example="ELDER"
    )


# =========================
# Response Schemas
# =========================

class FamilyOut(BaseModel):
    id: int
    family_name: str

    class Config:
        orm_mode = True


class FamilyInviteOut(BaseModel):
    invite_token: str
