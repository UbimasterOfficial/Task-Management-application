import { useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  priority: 'medium',
};

function TaskForm({ onCreate, creating }) {
  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const created = await onCreate(form);
    if (created) {
      setForm(emptyForm);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">NEW TASK</span>
          <h2>Create a task</h2>
        </div>
        <span className="form-hint">Simple, focused, trackable.</span>
      </div>

      <label>
        Task title
        <input
          maxLength="100"
          name="title"
          onChange={handleChange}
          placeholder="Example: Create Kubernetes manifests"
          required
          value={form.title}
        />
      </label>

      <label>
        Description
        <textarea
          maxLength="500"
          name="description"
          onChange={handleChange}
          placeholder="Add a short note about the task"
          rows="3"
          value={form.description}
        />
      </label>

      <div className="form-row">
        <label>
          Priority
          <select name="priority" onChange={handleChange} value={form.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button className="primary-button" disabled={creating} type="submit">
          {creating ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
