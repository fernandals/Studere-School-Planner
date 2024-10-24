from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.service import BaseService
from models.task import Task
from repositories.task_repository import TaskRepository
from services.course_service import CourseService


class TaskService(BaseService):
    def __init__(self, db: Session):
        self.repository = TaskRepository(db)
        self.course_service = CourseService(db)

    def create_task(
        self,
        title: str,
        description: str,
        course_id: str,
        current_user_id: str,
    ):
        course = self.course_service.retrieve_course(course_id, current_user_id)

        new_task = Task(title=title, description=description, course=course)

        return self.repository.create_task(new_task)

    def list_tasks(self, user_id, course_id: Optional[str] = None):
        if course_id:
            self.course_service.retrieve_course(course_id, user_id)

        return self.repository.list_tasks(user_id, course_id)

    def retrieve_task(self, task_id: str, current_user_id: str):
        task = self.repository.retrieve_task(task_id)
        if not task or task.course.user_id != current_user_id:
            raise HTTPException(status_code=404, detail="Task not found")

        return task

    def update_task(
        self,
        task_id: str,
        current_user_id: str,
        course_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        completed_at: Optional[str] = None,
    ):
        task = self.retrieve_task(task_id, current_user_id)
        if course_id:
            task.course_id = course_id
        if title:
            task.title = title
        if description:
            task.description = description
        if completed_at:
            task.completed_at = completed_at

        return self.repository.update_task(task)

    def delete_task(self, task_id: str, current_user_id: str):
        task = self.retrieve_task(task_id, current_user_id)

        return self.repository.delete_task(task.id)
