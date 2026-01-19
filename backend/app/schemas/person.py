from pydantic import BaseModel
from typing import Optional

class PersonCreate(BaseModel):
    full_name: str
    father_id: Optional[int] = None
    mother_id: Optional[int] = None
    father_name: Optional[str] = None
    mother_name: Optional[str] = None
