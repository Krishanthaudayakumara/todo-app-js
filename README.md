# To-Do Task Application

A compact, production-ready to-do application built with React, Express, and PostgreSQL.

Created by Krishantha Udaya Kumara  https://krishantha.dev

Short overview:
- Create, update, complete, and delete tasks
- Persistent storage with PostgreSQL
- Docker-ready for local development and deployment

Quick start (Docker):

```powershell
docker-compose up -d --build
```

## Environment Setup (.env files)

Since `.env` files are gitignored, you need to create them locally:

**Backend (.env)**

Create `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=todo_app
NODE_ENV=development
```

**Frontend (.env.local)**

Create `frontend/.env.local`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For Docker, these variables are set in `docker-compose.yml` and injected into the containers automatically.

Quick start (local):

1. Install dependencies:

```powershell
cd frontend; npm install
cd ../backend; npm install
```

2. Start backend and frontend in separate terminals:

```powershell
cd backend; npm start
cd frontend; npm start
```

API (examples):
- GET /api/tasks  list tasks
- POST /api/tasks  create a task
- PUT /api/tasks/:id  update a task
- DELETE /api/tasks/:id  delete a task

## Run with Docker

Start all services (frontend, backend, database) using Docker Compose:

```powershell
docker-compose up -d --build
```

To stop and remove containers:

```powershell
docker-compose down
```

To rebuild a single service image (example: frontend):

```powershell
docker-compose build frontend
docker-compose up -d frontend
```

## Running Tests

Backend (from project root or backend folder):

```powershell
cd backend
npm install
npm test
```

Frontend:

```powershell
cd frontend
npm install
npm test
```

When using Docker you can run tests inside the service container (example):

```powershell
docker-compose run --rm backend npm test
docker-compose run --rm frontend npm test
```

## Code Structure

Top-level layout:

```
.
├── frontend/         # React app (src/components, App.tsx)
├── backend/          # Express API (src/services, src/routes)
├── docker-compose.yml
└── README.md
```

License: MIT

Contact / portfolio: https://krishantha.dev