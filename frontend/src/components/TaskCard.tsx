import React from 'react';
import { Task } from '../api';
import '../styles/TaskCard.css';

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const handleComplete = async () => {
    try {
      await onComplete(task.id);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="task-card">
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      <button
        className="btn btn-complete"
        onClick={handleComplete}
        title="Mark as Done"
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;
