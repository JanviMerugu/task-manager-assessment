import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, onEdit, onDelete }) {
  return (
    <div className="column">
      <h3>{title}</h3>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
