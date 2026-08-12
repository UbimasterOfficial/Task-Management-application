const request = require('supertest');

jest.mock('../src/config/db', () => ({
  getDatabaseStatus: jest.fn(() => 'connected'),
  connectDatabase: jest.fn(),
}));

jest.mock('../src/models/Task', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Task = require('../src/models/Task');
const app = require('../src/app');

const taskId = '507f1f77bcf86cd799439011';

beforeEach(() => {
  jest.clearAllMocks();
});

test('GET /health returns healthy status', async () => {
  const response = await request(app).get('/health');

  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe('healthy');
  expect(response.body.database).toBe('connected');
});

test('GET /api/tasks returns all tasks', async () => {
  const tasks = [{ _id: taskId, title: 'Create Dockerfile', status: 'pending' }];
  Task.find.mockReturnValue({
    sort: jest.fn().mockResolvedValue(tasks),
  });

  const response = await request(app).get('/api/tasks');

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveLength(1);
});

test('GET /api/tasks filters tasks by status', async () => {
  Task.find.mockReturnValue({
    sort: jest.fn().mockResolvedValue([]),
  });

  const response = await request(app).get('/api/tasks?status=completed');

  expect(response.statusCode).toBe(200);
  expect(Task.find).toHaveBeenCalledWith({ status: 'completed' });
});

test('POST /api/tasks rejects a missing title', async () => {
  const response = await request(app).post('/api/tasks').send({ priority: 'high' });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Title is required');
});

test('POST /api/tasks rejects a non-string title', async () => {
  const response = await request(app).post('/api/tasks').send({ title: 123 });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Title is required');
});

test('POST /api/tasks rejects a non-string description', async () => {
  const response = await request(app).post('/api/tasks').send({
    title: 'Build CI pipeline',
    description: null,
  });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Description must be a string');
});

test('POST /api/tasks creates a task', async () => {
  Task.create.mockResolvedValue({
    _id: taskId,
    title: 'Build CI pipeline',
    description: '',
    status: 'pending',
    priority: 'high',
  });

  const response = await request(app).post('/api/tasks').send({
    title: 'Build CI pipeline',
    priority: 'high',
  });

  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe('Build CI pipeline');
});

test('PUT /api/tasks/:id updates task status', async () => {
  Task.findByIdAndUpdate.mockResolvedValue({
    _id: taskId,
    title: 'Create Dockerfile',
    status: 'completed',
  });

  const response = await request(app)
    .put(`/api/tasks/${taskId}`)
    .send({ status: 'completed' });

  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe('completed');
});

test('DELETE /api/tasks/:id deletes a task', async () => {
  Task.findByIdAndDelete.mockResolvedValue({ _id: taskId });

  const response = await request(app).delete(`/api/tasks/${taskId}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Task deleted successfully');
});
