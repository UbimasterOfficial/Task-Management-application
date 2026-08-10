const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

function TaskCard({ task, onStatusChange, onDelete }) {
  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <article className="task-card">
      <div className="task-card-top">
        <div>
          <div className="badge-row">
            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
            <span className={`status-badge ${task.status}`}>{statusLabels[task.status]}</span>
          </div>
          <h3>{task.title}</h3>
          <p>{task.description || 'No description added.'}</p>
        </div>
        <button
          aria-label={`Delete ${task.title}`}
          className="delete-button"
          onClick={() => onDelete(task._id)}
          type="button"
        >
          Delete
        </button>
      </div>

      <div className="task-card-bottom">
        <small>Created {createdDate}</small>
        <label className="status-select-label">
          Status
          <select value={task.status} onChange={(event) => onStatusChange(task._id, event.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
    </article>
  );
}

export default TaskCard;
