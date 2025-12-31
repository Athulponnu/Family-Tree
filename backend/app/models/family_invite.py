from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime, timedelta
from app.db.base import Base

class FamilyInvite(Base):
    __tablename__ = "family_invites"

    id = Column(Integer, primary_key=True)
    family_id = Column(Integer, ForeignKey("families.id"))
    token = Column(String(100), unique=True, nullable=False)
    role = Column(String(20))
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(days=2))
