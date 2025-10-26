import { Router, Request, Response } from 'express';
import taskService from '../services/TaskService';
import { CreateTaskDTO, UpdateTaskDTO } from '../types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getActiveTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(parseInt(id));
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    
    const createTaskDTO: CreateTaskDTO = {
      title,
      description
    };
    
    const task = await taskService.createTask(createTaskDTO);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
    res.status(400).json({ error: errorMessage });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updateTaskDTO: UpdateTaskDTO = {
      title,
      description,
      completed
    };
    
    const task = await taskService.updateTask(parseInt(id), updateTaskDTO);
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
    res.status(error instanceof Error && error.message === 'Task not found' ? 404 : 400)
      .json({ error: errorMessage });
  }
});

router.put('/:id/complete', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.completeTask(parseInt(id));
    res.json(task);
  } catch (error) {
    console.error('Error completing task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to complete task';
    res.status(error instanceof Error && error.message === 'Task not found' ? 404 : 400)
      .json({ error: errorMessage });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await taskService.deleteTask(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
