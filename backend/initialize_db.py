from db.session import Base, engine
from models.assignment import Assignment  # noqa
from models.task import Task  # noqa
from models.user import User  # noqa

# Cria todas as tabelas no banco de dados
print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
