import { useCallback, useEffect, useState } from 'react';
import FilterBar from './components/FilterBar';
import SummaryCards from './components/SummaryCards';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import { createTask, deleteTask, getHealth, getTasks, updateTaskStatus } from './services/api';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [health, setHealth] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks(filter);
      setTasks(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    getHealth().then(setHealth).catch(() => setHealth(null));
  }, []);

  async function handleCreate(form) {
    try {
      setCreating(true);
      setError('');
      await createTask(form);
      await loadTasks();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setCreating(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      setError('');
      await updateTaskStatus(id, status);
      await loadTasks();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) {
      return;
    }

    try {
      setError('');
      await deleteTask(id);
      await loadTasks();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="brand-block">
          <span className="brand-mark">CT</span>
          <div>
            <span className="eyebrow">DEVOPS-READY TASK MANAGEMENT</span>
            <h1>CloudTask</h1>
          </div>
        </div>
        <div className={health ? 'health-pill healthy' : 'health-pill unhealthy'}>
          <span className="health-dot" />
          {health ? `API Healthy · v${health.version}` : 'API Unavailable'}
        </div>
      </header>

      <main>
        <section className="intro-panel">
          <div>
            <span className="eyebrow">PROJECT DASHBOARD</span>
            <h2>Keep your DevOps work visible.</h2>
            <p>Create tasks, move them through the workflow, and keep the application simple enough to deploy, monitor, and roll back with confidence.</p>
          </div>
          <div className="stack-note">
            <span>MERN</span>
            <span>Docker</span>
            <span>ECS</span>
            <span>Kubernetes</span>
          </div>
        </section>

        <SummaryCards tasks={tasks} />

        <div className="content-grid">
          <TaskForm creating={creating} onCreate={handleCreate} />

          <section className="tasks-panel">
            <div className="tasks-heading">
              <div>
                <span className="eyebrow">TASKS</span>
                <h2>Current workload</h2>
              </div>
              <FilterBar activeFilter={filter} onChange={setFilter} />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="empty-state">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="empty-state">No tasks in this view yet.</div>
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    task={task}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer>
        CloudTask · MERN application prepared for CI/CD, containers, Kubernetes, ECS, and monitoring.
      </footer>
    </div>
  );
}

export default App;
