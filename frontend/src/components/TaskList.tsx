import React from 'react';
import { Task } from '../api';
import TaskCard from './TaskCard';
import '../styles/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onComplete,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
