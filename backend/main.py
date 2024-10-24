from fastapi import FastAPI

from api.routers import assignment_router, course_router, task_router, user_router

app = FastAPI()

app.include_router(user_router.router, prefix="/users", tags=["Users"])
app.include_router(task_router.router, prefix="/tasks", tags=["Tasks"])
app.include_router(
    assignment_router.router, prefix="/assignments", tags=["Assignments"]
)
app.include_router(course_router.router, prefix="/courses", tags=["Courses"])
