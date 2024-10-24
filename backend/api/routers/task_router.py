from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.security import get_current_user
from db.session import get_db
from models.user import User
from schemas.task_schemas import (
    TaskCreateUpdate,
    TaskPartialUpdate,
    TaskResponse,
)
from services.task_service import TaskService

router = APIRouter()


@router.post("", response_model=TaskResponse, status_code=201)
def create_task(
    body: TaskCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(db)
    task = task_service.create_task(body.title, body.description, current_user.id)
    return task


@router.get("")
def list_tasks(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    task_service = TaskService(db)
    tasks = task_service.list_tasks(current_user.id)

    return tasks


@router.get("/{task_id}")
def get_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    task_service = TaskService(db)
    task = task_service.retrieve_task(task_id, current_user.id)

    return task


@router.put("/{task_id}")
def update_task(task_id: str, body: TaskCreateUpdate, db: Session = Depends(get_db)):
    task_service = TaskService(db)
    task = task_service.update_task(
        task_id, body.title, body.description, body.completed_at
    )
    return task


@router.patch("/{task_id}")
def partial_update_task(
    task_id: str, body: TaskPartialUpdate, db: Session = Depends(get_db)
):
    task_service = TaskService(db)
    task = task_service.update_task(
        task_id, body.title, body.description, body.completed_at
    )
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    task_service = TaskService(db)

    task_service.delete_task(task_id)
