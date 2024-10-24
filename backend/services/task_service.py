from typing import Optional

from sqlalchemy.orm import Session

from core.service import BaseService
from models.task import Task
from repositories.task_repository import TaskRepository
from services.user_service import UserService


class TaskService(BaseService):
    def __init__(self, db: Session):
        self.task_repository = TaskRepository(db)
        self.user_service = UserService(db)

    def create_task(self, title: str, description: str, user_id: str):
        user = self.user_service.retrieve_user(user_id)
        new_task = Task(title=title, description=description, user=user)

        return self.task_repository.create_task(new_task)

    def list_tasks(self, user_id: Optional[str] = None):
        return self.task_repository.list_tasks(user_id)

    def retrieve_task(self, task_id: int):
        return self.task_repository.retrieve_task(task_id)

    def update_task(
        self,
        task_id: int,
        title: str,
        description: str,
        completed_at: Optional[str] = None,
    ):
        task = self.retrieve_task(task_id)
        task.title = title
        task.description = description
        task.completed_at = completed_at

        return self.task_repository.update_task(task)

    def delete_task(self, task_id: int):
        return self.task_repository.delete_task(task_id)
