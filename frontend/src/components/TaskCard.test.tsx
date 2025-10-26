import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskCard from '../components/TaskCard';
import { Task } from '../api';

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('TaskCard', () => {
  it('should render task card with title and description', () => {
    const mockOnComplete = jest.fn();

    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call onComplete when Done button is clicked', async () => {
    const mockOnComplete = jest.fn();

    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
      />
    );

    const doneButton = screen.getByRole('button', { name: /Done/i });
    fireEvent.click(doneButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith(mockTask.id);
    });
  });
});
