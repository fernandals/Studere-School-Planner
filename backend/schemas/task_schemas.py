import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    completed_at: Optional[datetime] = None


class TaskResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    completed_at: Optional[datetime]
    created_at: datetime
    user_id: uuid.UUID

    class Config:
        orm_mode = True
