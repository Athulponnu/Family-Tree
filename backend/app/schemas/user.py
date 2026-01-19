from pydantic import BaseModel, Field
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBioUpdate(BaseModel):
    bio: Optional[str] = Field(
        None,
        max_length=500,
        example="I am interested in building my family tree."
    )
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str