from flask import request, jsonify # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash # type: ignore

from models import User, Task, Assignment, db

def init_routes(app):

  @app.route('/')
  def hello():
    return "Hello, World!"

  ## User Management

  @app.route('/api/register', methods=['POST'])
  def register():
      data = request.get_json()
      hashed_password = generate_password_hash(data['password'], method='scrypt')
      
      new_user = User(username=data['username'], email=data['email'], password=hashed_password)
      
      db.session.add(new_user)
      db.session.commit()
      
      return jsonify({'message': 'User created successfully!'})

  @app.route('/api/login', methods=['POST'])
  def login():
      data = request.get_json()
      user = User.query.filter_by(username=data['username']).first()
      
      if not user or not check_password_hash(user.password, data['password']):
          return jsonify({'message': 'Invalid credentials'})
      
      return jsonify({'message': 'Login successful!'})

  ## Task Management

  @app.route('/api/tasks', methods=['POST'])
  def create_task():
      data = request.get_json()
      new_task = Task(name=data['name'], completed=False, user_id=data['user_id'])
      
      db.session.add(new_task)
      db.session.commit()
      
      return jsonify({'message': 'Task created successfully!'})

  @app.route('/api/tasks/<int:user_id>', methods=['GET'])
  def get_tasks(user_id):
      tasks = Task.query.filter_by(user_id=user_id).all()
      task_list = [{"id": task.id, "name": task.name, "completed": task.completed} for task in tasks]
      
      return jsonify(task_list)

  @app.route('/api/tasks/<int:task_id>', methods=['PUT'])
  def update_task(task_id):
      data = request.get_json()
      task = Task.query.get(task_id)
      
      if not task:
          return jsonify({'message': 'Task not found'})
      
      task.name = data['name']
      task.completed = data['completed']
      
      db.session.commit()
      return jsonify({'message': 'Task updated successfully!'})

  @app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
  def delete_task(task_id):
      task = Task.query.get(task_id)
      
      if not task:
          return jsonify({'message': 'Task not found'})
      
      db.session.delete(task)
      db.session.commit()
      return jsonify({'message': 'Task deleted successfully!'})


  ## Assignment Management (to com preguiça mas é só copiar)

  