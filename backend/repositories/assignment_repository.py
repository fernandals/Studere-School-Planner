from core.repository import BaseRepository
from models.assignment import Assignment


class AssignmentRepository(BaseRepository):
    def create_assignment(self, assignment: Assignment) -> Assignment:
        self.db.add(assignment)
        self.db.commit()
        self.db.refresh(assignment)
        return assignment

    def retrieve_assignment(self, assignment_id: int) -> Assignment:
        return self.db.query(Assignment).filter(Assignment.id == assignment_id).first()

    def update_assignment(self, assignment: Assignment) -> Assignment:
        self.db.merge(assignment)
        self.db.commit()
        self.db.refresh(assignment)
        return assignment

    def delete_assignment(self, assignment_id: int) -> None:
        assignment = (
            self.db.query(Assignment).filter(Assignment.id == assignment_id).first()
        )
        if assignment:
            self.db.delete(assignment)
            self.db.commit()

    def list_assignments(self, user_id) -> list[Assignment]:
        if user_id:
            return self.db.query(Assignment).filter(Assignment.user_id == user_id).all()
        return self.db.query(Assignment).all()
