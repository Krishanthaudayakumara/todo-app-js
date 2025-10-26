import pool from '../db';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types';

export class TaskService {
  async getActiveTasks(): Promise<Task[]> {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM tasks
      WHERE completed = FALSE
      ORDER BY created_at DESC
      LIMIT 5
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getAllTasks(): Promise<Task[]> {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM tasks
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getTaskById(id: number): Promise<Task | null> {
    const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM tasks
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    const { title, description = null } = data;
    
    if (!title || title.trim().length === 0) {
      throw new Error('Task title is required');
    }

    const query = `
      INSERT INTO tasks (title, description, completed, created_at, updated_at)
      VALUES ($1, $2, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, title, description, completed, created_at, updated_at
    `;
    
    const result = await pool.query(query, [title, description]);
    return result.rows[0];
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<Task> {
    const existingTask = await this.getTaskById(id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const title = data.title ?? existingTask.title;
    const description = data.description ?? existingTask.description;
    const completed = data.completed ?? existingTask.completed;

    const query = `
      UPDATE tasks
      SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, title, description, completed, created_at, updated_at
    `;

    const result = await pool.query(query, [title, description, completed, id]);
    return result.rows[0];
  }

  async deleteTask(id: number): Promise<boolean> {
    const query = 'DELETE FROM tasks WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async completeTask(id: number): Promise<Task> {
    return this.updateTask(id, { completed: true });
  }
}

export default new TaskService();
