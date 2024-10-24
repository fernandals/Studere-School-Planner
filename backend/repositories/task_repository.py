from core.repository import BaseRepository
from models.task import Task


class TaskRepository(BaseRepository):
    def create_task(self, task: Task) -> Task:
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def retrieve_task(self, task_id: int) -> Task:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def update_task(self, task: Task) -> Task:
        self.db.merge(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task(self, task_id: int) -> None:
        task = self.db.query(Task).filter(Task.id == task_id).first()
        if task:
            self.db.delete(task)
            self.db.commit()

    def list_tasks(self, user_id) -> list[Task]:
        if user_id:
            return self.db.query(Task).filter(Task.user_id == user_id).all()
        return self.db.query(Task).all()
