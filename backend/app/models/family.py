from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Family(Base):
    __tablename__ = "families"

    id = Column(Integer, primary_key=True)
    family_name = Column(String(100), unique=True, nullable=False)

    members = relationship("FamilyMember", back_populates="family")
    memberships = relationship("FamilyMembership", back_populates="family")
