import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { Task } from '../api';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Task 2',
    completed: false,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
  },
];

describe('TaskList', () => {
  it('should render loading state', () => {
    const mockOnComplete = jest.fn();

    render(
      <TaskList
        tasks={[]}
        onComplete={mockOnComplete}
        isLoading={true}
      />
    );

    expect(screen.getByText(/Loading tasks/i)).toBeInTheDocument();
  });

  it('should render empty state when no tasks', () => {
    const mockOnComplete = jest.fn();

    render(
      <TaskList
        tasks={[]}
        onComplete={mockOnComplete}
        isLoading={false}
      />
    );

    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('should render task list when tasks are available', () => {
    const mockOnComplete = jest.fn();

    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        isLoading={false}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
