from pydantic import BaseModel, Field
from typing import Optional

class UserBioUpdate(BaseModel):
    bio: Optional[str] = Field(
        None,
        max_length=500,
        example="I am interested in building my family tree."
    )
