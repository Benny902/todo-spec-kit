
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  dueDate?: string;
};

const API_URL = 'http://localhost:5080'; // Adjust if backend runs on a different port

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  // Filtering state
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [filterDueDate, setFilterDueDate] = useState('');

  // Fetch tasks
  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new task
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate || null,
        completed: false
      })
    });
    setNewTitle('');
    setNewDescription('');
    setNewDueDate('');
    fetchTodos();
  };
  // Edit task
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditDueDate(todo.dueDate ? todo.dueDate.substring(0, 10) : '');
    setEditCompleted(todo.completed);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;
    await fetch(`${API_URL}/tasks/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate || null,
        completed: editCompleted
      })
    });
    setEditingId(null);
    fetchTodos();
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // Toggle completed
  const toggleTodo = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'PATCH' });
    fetchTodos();
  };

  // Delete task
  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="todo-app-container">
      <h2 className="todo-title">Todo List</h2>
      {/* Filtering UI */}
      <div className="todo-filters">
        <label>
          Status:
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Due before:
          <input type="date" value={filterDueDate} onChange={e => setFilterDueDate(e.target.value)} />
        </label>
      </div>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          type="text"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={e => setNewDueDate(e.target.value)}
        />
        <button type="submit" className="primary-btn">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <ul className="todo-list">
          {todos
            .filter(todo => {
              if (filterStatus === 'completed' && !todo.completed) return false;
              if (filterStatus === 'incomplete' && todo.completed) return false;
              if (filterDueDate && todo.dueDate) {
                return todo.dueDate.substring(0, 10) <= filterDueDate;
              }
              if (filterDueDate && !todo.dueDate) return false;
              return true;
            })
            .map(todo => (
            <li key={todo.id} className={`todo-card${todo.completed ? ' completed' : ''}`}> 
              {editingId === todo.id ? (
                <form onSubmit={saveEdit} className="todo-edit-form">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={e => setEditDueDate(e.target.value)}
                  />
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={editCompleted}
                      onChange={e => setEditCompleted(e.target.checked)}
                    /> Completed
                  </label>
                  <div className="edit-btn-group">
                    <button type="submit" className="primary-btn">Save</button>
                    <button type="button" className="secondary-btn" onClick={cancelEdit}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="todo-card-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="todo-title-text">{todo.title}</span>
                  <button className="icon-btn" title="Edit" onClick={() => startEdit(todo)}>
                    ✏️
                  </button>
                  <button className="icon-btn" title="Delete" onClick={() => deleteTodo(todo.id)}>
                    🗑️
                  </button>
                </div>
                )}
                {todo.description && <div className="todo-desc"><b>Description:</b> {todo.description}</div>}
                {todo.dueDate && <div className="todo-due"><b>Due:</b> {todo.dueDate.substring(0, 10)}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
