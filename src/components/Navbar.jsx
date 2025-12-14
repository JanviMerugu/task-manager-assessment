export default function Navbar({ onAdd }) {
  return (
    <div className="navbar">
      <h2>Task Manager</h2>
      <button onClick={onAdd}>Add Task</button>
    </div>
  );
}
