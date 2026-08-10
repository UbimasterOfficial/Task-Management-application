function SummaryCards({ tasks }) {
  const counts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    inProgress: tasks.filter((task) => task.status === 'in-progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  };

  const cards = [
    ['Total Tasks', counts.total, 'All work items'],
    ['Pending', counts.pending, 'Waiting to start'],
    ['In Progress', counts.inProgress, 'Currently active'],
    ['Completed', counts.completed, 'Finished tasks'],
  ];

  return (
    <section className="summary-grid" aria-label="Task summary">
      {cards.map(([label, value, note]) => (
        <article className="summary-card" key={label}>
          <span className="summary-label">{label}</span>
          <strong>{value}</strong>
          <small>{note}</small>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
