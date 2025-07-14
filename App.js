
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);


  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    })
      .then(res => res.json())
      .then(todo => {
        setTodos([...todos, todo]);
        setNewTodo('');
      });
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>📝 Todo App – React + Express</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button onClick={handleAddTodo} style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
            {todo.text}
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{ marginLeft: "1rem", color: "red", cursor: "pointer" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
