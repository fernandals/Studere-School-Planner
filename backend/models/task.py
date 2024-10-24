import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.session import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String)

    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    course = relationship("Course", back_populates="tasks")

    completed_at = Column(DateTime)
    created_at = Column(DateTime, server_default="now()")
