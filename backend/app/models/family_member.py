from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)

    family_id = Column(Integer, ForeignKey("families.id"), nullable=False)

    # Father
    father_id = Column(Integer, ForeignKey("family_members.id"), nullable=True)
    father_name = Column(String(100), nullable=True)

    # Mother
    mother_id = Column(Integer, ForeignKey("family_members.id"), nullable=True)
    mother_name = Column(String(100), nullable=True)

    family = relationship("Family", back_populates="members")

    father = relationship(
        "FamilyMember",
        remote_side=[id],
        foreign_keys=[father_id],
        backref="father_children",
        post_update=True,
    )

    mother = relationship(
        "FamilyMember",
        remote_side=[id],
        foreign_keys=[mother_id],
        backref="mother_children",
        post_update=True,
    )
