
import React, { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  // Fetch todos from backend
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add a new todo
  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo })
    })
      .then(res => res.json())
      .then(todo => {
        setTodos([...todos, todo]);
        setNewTodo('');
      });
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  // Start editing
  const handleEditStart = (todo) => {
    setEditingTodoId(todo.id);
    setEditedText(todo.text);
  };

  // Save updated todo
  const handleUpdateTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editedText })
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => (t.id === id ? updated : t)));
        setEditingTodoId(null);
        setEditedText('');
      });
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    fetch(`http://localhost:5000/todos/${id}/complete`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => (t.id === id ? updated : t)));
      });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>📝 Todo App (Full CRUD + Mark as Done)</h2>

      <input
        type="text"
        placeholder="Add a new task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              marginBottom: "0.5rem",
              textDecoration: todo.isCompleted ? 'line-through' : 'none'
            }}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo.id)}
            />

            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo.id)}>💾 Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditStart(todo)}>✏️ Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>❌ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "1rem" }}>
        🧮 Total tasks: {todos.length} | ✅ Completed: {todos.filter(t => t.isCompleted).length}
      </p>
    </div>
  );
};

export default App;
