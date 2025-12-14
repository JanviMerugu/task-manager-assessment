export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card" onClick={() => onEdit(task)}>
      <h4>{task.title}</h4>

      {task.isDuplicate && (
        <span className="duplicate">Duplicate</span>
      )}

      <small>{task.priority}</small>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Delete this task?")) {
            onDelete(task.id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
