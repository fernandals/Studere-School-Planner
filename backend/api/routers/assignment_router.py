from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.security import get_current_user
from db.session import get_db
from models.user import User
from schemas.assignment_schemas import (
    AssignmentCreateUpdate,
    AssignmentPartialUpdate,
    AssignmentResponse,
)
from services.assignment_service import AssignmentService

router = APIRouter()


@router.post("", response_model=AssignmentResponse, status_code=201)
def create_assignment(
    body: AssignmentCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment_service = AssignmentService(db)
    assignment = assignment_service.create_assignment(
        title=body.title,
        description=body.description,
        course_id=body.course_id,
        current_user_id=current_user.id,
        due_at=body.due_at,
    )
    return assignment


@router.get("")
def list_assignments(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    assignment_service = AssignmentService(db)
    assignments = assignment_service.list_assignments(current_user.id)

    return assignments


@router.get("/{assignment_id}")
def get_assignment(
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment_service = AssignmentService(db)
    assignment = assignment_service.retrieve_assignment(assignment_id, current_user.id)

    return assignment


@router.put("/{assignment_id}")
def update_assignment(
    assignment_id: str,
    body: AssignmentCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment_service = AssignmentService(db)

    assignment = assignment_service.update_assignment(
        assignment_id=assignment_id,
        course_id=body.course_id,
        title=body.title,
        description=body.description,
        due_at=body.due_at,
        current_user_id=current_user.id,
    )
    return assignment


@router.patch("/{assignment_id}")
def partial_update_assignment(
    assignment_id: str,
    body: AssignmentPartialUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment_service = AssignmentService(db)
    assignment = assignment_service.update_assignment(
        assignment_id=assignment_id,
        course_id=body.course_id,
        title=body.title,
        description=body.description,
        due_at=body.due_at,
        current_user_id=current_user.id,
    )
    return assignment


@router.delete("/{assignment_id}", status_code=204)
def delete_assignment(
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment_service = AssignmentService(db)

    assignment_service.delete_assignment(assignment_id, current_user.id)
