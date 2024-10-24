import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.session import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String)

    # Column to reference the user
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id")
    )  # Foreign key to the users table

    # Relationship with the User model
    user = relationship(
        "User", back_populates="assignments"
    )  # Relationship with the User model

    due_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default="now()")
