from typing import Optional

from core.repository import BaseRepository
from models.task import Task


class TaskRepository(BaseRepository):
    def create_task(self, task: Task) -> Task:
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def retrieve_task(self, task_id: str) -> Task:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def update_task(self, task: Task) -> Task:
        self.db.merge(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task(self, task_id: str) -> None:
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task:
            self.db.delete(task)
            self.db.commit()

    def list_tasks(
        self, user_id: Optional[str] = None, course_id: Optional[str] = None
    ) -> list[Task]:
        if course_id:
            return self.db.query(Task).filter(Task.course_id == course_id).all()

        if user_id:
            return self.db.query(Task).join(Task).filter(Task.user_id == user_id).all()

        return self.db.query(Task).all()
