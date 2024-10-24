from typing import Optional

from sqlalchemy.orm import Session

from core.service import BaseService
from models.assignment import Assignment
from repositories.assignment_repository import AssignmentRepository
from services.user_service import UserService


class AssignmentService(BaseService):
    def __init__(self, db: Session):
        self.assignment_repository = AssignmentRepository(db)
        self.user_service = UserService(db)

    def create_assignment(
        self, title: str, description: str, user_id: str, due_at: Optional[str] = None
    ):
        user = self.user_service.retrieve_user(user_id)
        new_assignment = Assignment(
            title=title, description=description, user=user, due_at=due_at
        )

        return self.assignment_repository.create_assignment(new_assignment)

    def list_assignments(self, user_id: Optional[str] = None):
        return self.assignment_repository.list_assignments(user_id)

    def retrieve_assignment(self, assignment_id: int):
        return self.assignment_repository.retrieve_assignment(assignment_id)

    def update_assignment(
        self,
        assignment_id: int,
        title: str,
        description: str,
        due_at: Optional[str] = None,
    ):
        assignment = self.retrieve_assignment(assignment_id)
        assignment.title = title
        assignment.description = description
        assignment.due_at = due_at

        return self.assignment_repository.update_assignment(assignment)

    def delete_assignment(self, assignment_id: int):
        return self.assignment_repository.delete_assignment(assignment_id)
