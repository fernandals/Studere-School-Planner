from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.service import BaseService
from models.assignment import Assignment
from repositories.assignment_repository import AssignmentRepository
from services.course_service import CourseService


class AssignmentService(BaseService):
    def __init__(self, db: Session):
        self.repository = AssignmentRepository(db)
        self.course_service = CourseService(db)

    def create_assignment(
        self,
        title: str,
        description: str,
        course_id: str,
        current_user_id: str,
        due_at: Optional[str] = None,
    ):
        course = self.course_service.retrieve_course(course_id, current_user_id)

        new_assignment = Assignment(
            title=title, description=description, course=course, due_at=due_at
        )

        return self.repository.create_assignment(new_assignment)

    def list_assignments(self, user_id: str, course_id: Optional[str] = None):
        if course_id:
            self.course_service.retrieve_course(course_id, user_id)

        return self.repository.list_assignments(user_id, course_id)

    def retrieve_assignment(self, assignment_id: str, current_user_id: str):
        assignment = self.repository.retrieve_assignment(assignment_id)
        if not assignment or assignment.course.user_id != current_user_id:
            raise HTTPException(status_code=404, detail="Assignment not found")

        return assignment

    def update_assignment(
        self,
        assignment_id: str,
        current_user_id: str,
        course_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        due_at: Optional[str] = None,
    ):
        assignment = self.retrieve_assignment(assignment_id, current_user_id)
        if course_id:
            assignment.course_id = course_id
        if title:
            assignment.title = title
        if description:
            assignment.description = description
        if due_at:
            assignment.due_at = due_at

        return self.repository.update_assignment(assignment)

    def delete_assignment(self, assignment_id: str, current_user_id: str):
        assignment = self.retrieve_assignment(assignment_id, current_user_id)

        return self.repository.delete_assignment(assignment.id)
