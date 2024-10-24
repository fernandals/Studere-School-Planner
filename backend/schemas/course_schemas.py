import uuid
from datetime import datetime

from pydantic import BaseModel


class CourseCreateUpdate(BaseModel):
    name: str


class CourseResponse(BaseModel):
    id: uuid.UUID
    name: str
    created_at: datetime
    user_id: uuid.UUID

    class Config:
        orm_mode = True
