-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Insert sample data
INSERT INTO tasks (title, description, completed) VALUES
    ('Buy groceries', 'Milk, eggs, bread', FALSE),
    ('Finish project report', 'Complete Q4 analysis', FALSE),
    ('Call dentist', 'Schedule appointment', TRUE),
    ('Exercise', 'Run 5km', FALSE);
