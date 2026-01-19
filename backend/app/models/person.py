from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Person(Base):
    __tablename__ = "persons"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)

    family_id = Column(Integer, ForeignKey("families.id"), nullable=False)

    # Parent links (if exists)
    father_id = Column(Integer, ForeignKey("persons.id"), nullable=True)
    mother_id = Column(Integer, ForeignKey("persons.id"), nullable=True)

    # Parent names (if not yet created)
    father_name = Column(String, nullable=True)
    mother_name = Column(String, nullable=True)

    family = relationship("Family", back_populates="persons")

    father = relationship(
        "Person",
        remote_side=[id],
        foreign_keys=[father_id],
        post_update=True
    )

    mother = relationship(
        "Person",
        remote_side=[id],
        foreign_keys=[mother_id],
        post_update=True
    )
