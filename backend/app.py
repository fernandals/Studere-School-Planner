from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/api/tasks')
def get_tasks():
    tasks = [
        {"id": 1, "name": "Study Math", "completed": False},
        {"id": 2, "name": "Complete Assignment", "completed": True}
    ]
    return jsonify(tasks)

if __name__ == "__main__":
    app.run(debug=True)
