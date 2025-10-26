import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskAPI, Task, CreateTaskDTO } from './api';
import './styles/App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskAPI.getActiveTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDTO) => {
    try {
      setIsCreating(true);
      setError('');
      const newTask = await taskAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await taskAPI.completeTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Error completing task:', err);
      setError('Failed to complete task. Please try again.');
      throw err;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do Tasks</h1>
        <p className="subtitle">Stay organized with your tasks</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}
        <div className="container">
          <section className="form-section">
            <h2>Add a Task</h2>
            <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
          </section>

          <section className="tasks-section">
            <h2>
              My Tasks
              {tasks.length > 0 && <span className="task-count">({tasks.length})</span>}
            </h2>
            <TaskList
              tasks={tasks}
              onComplete={handleCompleteTask}
              isLoading={loading}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 <a href="https://krishantha.dev" target="_blank" rel="noopener noreferrer">Krishantha.dev</a>. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
