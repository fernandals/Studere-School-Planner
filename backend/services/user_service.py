import bcrypt
from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.security import create_access_token
from core.service import BaseService
from models.user import User
from repositories.user_repository import UserRepository


class UserService(BaseService):
    def __init__(self, db: Session):
        self.repository = UserRepository(db)
    
    def generate_hashed_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")    
    
    def compare_passwords(self, password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
    
    def register_user(self, email: str, password: str, full_name: str) -> User:
        user = self.repository.get_user_by_email(email)
        if user:
            raise HTTPException(status_code=400, detail="Email já cadastrado")
        hashed_password = self.generate_hashed_password(password)
        new_user = User(email=email, password=hashed_password, full_name=full_name)
        self.repository.create_user(new_user)
        
        return new_user

    def login(self, email: str, password: str):
        user = self.repository.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        if not self.compare_passwords(password, user.password):
            raise HTTPException(status_code=401, detail="Senha incorreta")
        
        token = create_access_token(data={"sub": str(user.id)})
        
        return {"access_token": token, "token_type": "bearer"}
    
    def retrieve_user(self, user_id: int) -> User:
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return user