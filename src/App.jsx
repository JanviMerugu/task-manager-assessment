import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import initialTasks from "./data/tasks.json";
import "./styles/app.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    setTasks(saved ? JSON.parse(saved) : initialTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function saveTask(task) {
    const sameTitle = tasks.filter(
      t => t.title === task.title && t.status === task.status && t.id !== task.id
    );

    task.isDuplicate = sameTitle.length > 0;

    setTasks(prev =>
      prev.some(t => t.id === task.id)
        ? prev.map(t => (t.id === task.id ? task : t))
        : [...prev, task]
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <>
      <Navbar onAdd={() => setShowModal(true)} />

      <div className="board">
        {["To Do", "In Progress", "Completed"].map(status => (
          <TaskColumn
            key={status}
            title={status}
            tasks={tasks.filter(t => t.status === status)}
            onEdit={setEditTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {(showModal || editTask) && (
        <TaskModal
          task={editTask}
          onSave={saveTask}
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
        />
      )}
    </>
  );
}
