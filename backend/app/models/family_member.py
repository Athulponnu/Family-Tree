from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(Integer, primary_key=True)

    full_name = Column(String(100), nullable=False)

    family_id = Column(Integer, ForeignKey("families.id"), nullable=False)

    # Generic parent reference (inside same family)
    parent_id = Column(Integer, ForeignKey("family_members.id"), nullable=True)

    family = relationship("Family", back_populates="members")

    parent = relationship(
        "FamilyMember",
        remote_side=[id],
        backref="children"
    )
