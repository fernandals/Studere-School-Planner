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

    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    course = relationship("Course", back_populates="assignments")

    due_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default="now()")
