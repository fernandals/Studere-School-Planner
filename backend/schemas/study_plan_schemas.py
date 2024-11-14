import uuid
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# Schema for StudyPlanTopic to be used within StudyPlan schemas
class StudyPlanTopicBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class StudyPlanTopicCreateUpdate(StudyPlanTopicBase):
    pass


class StudyPlanTopicResponse(StudyPlanTopicBase):
    id: uuid.UUID
    created_at: datetime


# Schema for StudyPlan with topics list
class StudyPlanCreateUpdate(BaseModel):
    title: str
    course_id: uuid.UUID
    topics: List[StudyPlanTopicCreateUpdate]

    class Config:
        schema_extra = {
            "example": {
                "title": "Mathematics Study Plan",
                "course_id": "550e8400-e29b-41d4-a716-446655440000",
                "topics": [
                    {
                        "title": "Algebra Basics",
                        "description": "Introduction to algebraic principles",
                    },
                    {
                        "title": "Geometry Fundamentals",
                        "description": "Basic concepts in geometry",
                    },
                ],
            }
        }


class StudyPlanResponse(BaseModel):
    id: uuid.UUID
    title: str
    course_id: uuid.UUID
    topics: List[StudyPlanTopicResponse]
    created_at: datetime

    class Config:
        orm_mode = True


class StudyPlanAIGenerate(BaseModel):
    prompt: str
    course_id: uuid.UUID
