import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('should render form with title and description fields', () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add a Task/i })).toBeInTheDocument();
  });

  it('should show error when submitting empty title', async () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Add a Task/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a task title/i)).toBeInTheDocument();
    });
  });

  it('should call onSubmit with form data when submitted', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/Task Title/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /Add a Task/i });

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task description',
      });
    });
  });

  it('should clear form after successful submission', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/Task Title/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /Add a Task/i });

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
    });
  });
});
