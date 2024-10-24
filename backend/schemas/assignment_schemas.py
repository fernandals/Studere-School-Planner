import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_at: datetime


class AssignmentResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    due_at: Optional[datetime]
    created_at: datetime
    user_id: uuid.UUID

    class Config:
        orm_mode = True
