from sqlalchemy.orm import Session

from core.singleton import SingletonMeta

class BaseRepository(metaclass=SingletonMeta):
    def __init__(self, db: Session):
        self.db = db