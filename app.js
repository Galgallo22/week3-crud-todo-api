
const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// GET active todos (bonus)
// Keep this before GET /todos/:id
app.get('/todos/active', (req, res) => {
  const active = todos.filter((t) => !t.completed);
  res.status(200).json(active);
});

// GET one todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// POST new todo with task validation
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (typeof task !== 'string' || !task.trim()) {
    return res.status(400).json({
      message: 'Task is required and must be a non-empty string',
    });
  }

  const newTodo = {
    id: todos.length
      ? Math.max(...todos.map((t) => t.id)) + 1
      : 1,
    task: task.trim(),
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH update todo
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  Object.assign(todo, req.body);
  res.status(200).json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(204).send();
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));



 
