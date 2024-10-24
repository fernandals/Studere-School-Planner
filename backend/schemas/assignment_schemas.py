import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AssignmentCreateUpdate(BaseModel):
    course_id: uuid.UUID
    title: str
    description: Optional[str] = None
    due_at: datetime


class AssignmentPartialUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_at: Optional[str] = None
    course_id: Optional[uuid.UUID] = None


class AssignmentResponse(BaseModel):
    id: uuid.UUID
    course_id: uuid.UUID
    title: str
    description: Optional[str]
    due_at: Optional[datetime]
    created_at: datetime

    class Config:
        orm_mode = True
