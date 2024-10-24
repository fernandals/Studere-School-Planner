import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TaskCreateUpdate(BaseModel):
    title: str
    course_id: uuid.UUID
    description: Optional[str] = None
    completed_at: Optional[datetime] = None


class TaskPartialUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed_at: Optional[datetime] = None
    course_id: Optional[uuid.UUID] = None


class TaskResponse(BaseModel):
    id: uuid.UUID
    course_id: uuid.UUID
    title: str
    description: Optional[str]
    completed_at: Optional[datetime]
    created_at: datetime

    class Config:
        orm_mode = True
