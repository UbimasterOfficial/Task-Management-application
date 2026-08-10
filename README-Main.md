# CloudTask - MERN Application Only

This package contains only the MERN application-development part of the full CloudTask DevOps project.

The backend and frontend source files are copied unchanged from the full CloudTask project, so the application behavior is the same.

## Included

- `backend/` - Node.js + Express + MongoDB/Mongoose API
- `frontend/` - React + Vite UI
- `.env.example` - local backend environment-variable template
- `.gitignore`
- root `package.json` - helper scripts

## Not included

DevOps/deployment files are intentionally removed from this package:

- Dockerfiles and Docker Compose
- GitHub Actions workflows
- Kubernetes manifests
- Terraform
- AWS ECS/ECR files
- Monitoring files

## Local setup

### 1. Create your environment file

From the project root, copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then edit `MONGODB_URI` with your MongoDB Atlas connection string.

### 2. Install backend packages

```bash
cd backend
npm install
```

### 3. Install frontend packages

Open another terminal:

```bash
cd frontend
npm install
```

### 4. Start the backend

From `backend/`:

```bash
npm run dev
```

Backend: `http://localhost:5000`

Health endpoint: `http://localhost:5000/health`

### 5. Start the frontend

From `frontend/`:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Vite proxies `/api` and `/health` requests to the local backend at port 5000.

## Main API endpoints

- `GET /health`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/tasks?status=pending`
- `GET /api/tasks?status=in-progress`
- `GET /api/tasks?status=completed`

## Useful checks

Backend tests:

```bash
cd backend
npm test
```

Backend lint:

```bash
cd backend
npm run lint
```

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend production build:

```bash
cd frontend
npm run build
```
