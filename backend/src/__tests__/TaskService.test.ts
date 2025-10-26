import { TaskService } from '../services/TaskService';
import pool from '../db';

jest.mock('../db');

const mockPool = pool as jest.Mocked<typeof pool>;

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getActiveTasks', () => {
    it('should return active tasks ordered by creation date', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          completed: false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      mockPool.query = jest.fn().mockResolvedValue({ rows: mockTasks });

      const service = new TaskService();
      const tasks = await service.getActiveTasks();

      expect(tasks).toEqual(mockTasks);
      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('createTask', () => {
    it('should create a new task with valid data', async () => {
      const newTask = {
        id: 1,
        title: 'New Task',
        description: 'New Description',
        completed: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPool.query = jest.fn().mockResolvedValue({ rows: [newTask] });

      const service = new TaskService();
      const task = await service.createTask({
        title: 'New Task',
        description: 'New Description'
      });

      expect(task).toEqual(newTask);
    });

    it('should throw error when title is empty', async () => {
      const service = new TaskService();

      await expect(
        service.createTask({ title: '', description: 'Test' })
      ).rejects.toThrow('Task title is required');
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const existingTask = {
        id: 1,
        title: 'Old Title',
        description: 'Old Description',
        completed: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const updatedTask = {
        ...existingTask,
        title: 'New Title'
      };

      mockPool.query = jest
        .fn()
        .mockResolvedValueOnce({ rows: [existingTask] })
        .mockResolvedValueOnce({ rows: [updatedTask] });

      const service = new TaskService();
      const task = await service.updateTask(1, { title: 'New Title' });

      expect(task.title).toBe('New Title');
    });

    it('should throw error when task not found', async () => {
      mockPool.query = jest.fn().mockResolvedValue({ rows: [] });

      const service = new TaskService();

      await expect(
        service.updateTask(999, { title: 'Test' })
      ).rejects.toThrow('Task not found');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockPool.query = jest.fn().mockResolvedValue({ rowCount: 1 });

      const service = new TaskService();
      const result = await service.deleteTask(1);

      expect(result).toBe(true);
    });

    it('should return false when task not found', async () => {
      mockPool.query = jest.fn().mockResolvedValue({ rowCount: 0 });

      const service = new TaskService();
      const result = await service.deleteTask(999);

      expect(result).toBe(false);
    });
  });
});
