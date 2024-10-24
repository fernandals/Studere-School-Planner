from api.routers import assignment, task, user
from fastapi import FastAPI

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(task.router, prefix="/tasks", tags=["Tasks"])
app.include_router(assignment.router, prefix="/assignments", tags=["Assignments"])
