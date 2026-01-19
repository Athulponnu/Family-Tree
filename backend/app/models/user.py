from sqlalchemy import Column, Integer, String,Text,ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    memberships = relationship("FamilyMembership", back_populates="user")
    bio = Column(Text, nullable=True)
        # 🔑 NEW: link user to person
    person_id = Column(Integer, ForeignKey("persons.id"), nullable=True)

    person = relationship("Person")