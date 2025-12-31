from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class FamilyMembership(Base):
    __tablename__ = "family_memberships"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    family_id = Column(Integer, ForeignKey("families.id"), nullable=False)
    role = Column(String(20), nullable=False)

    user = relationship("User", back_populates="memberships")
    family = relationship("Family", back_populates="memberships")
