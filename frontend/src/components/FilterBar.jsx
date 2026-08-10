const filters = [
  ['all', 'All'],
  ['pending', 'Pending'],
  ['in-progress', 'In Progress'],
  ['completed', 'Completed'],
];

function FilterBar({ activeFilter, onChange }) {
  return (
    <div className="filter-bar">
      {filters.map(([value, label]) => (
        <button
          className={activeFilter === value ? 'filter-button active' : 'filter-button'}
          key={value}
          onClick={() => onChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
