import uuid

from sqlalchemy import Column, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True)
    password = Column(String)
    full_name = Column(String)

    tasks = relationship("Task", back_populates="user")
    assignments = relationship("Assignment", back_populates="user")
    created_at = Column(DateTime, server_default="now()")
