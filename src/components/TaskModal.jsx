import { useState } from "react";

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(
    task || {
      title: "",
      description: "",
      priority: "Low",
      status: "To Do",
      dueDate: ""
    }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    if (!form.title) {
      alert("Title required");
      return;
    }

    onSave({
      ...form,
      id: task?.id || Date.now(),
      createdAt: task?.createdAt || new Date().toISOString().split("T")[0]
    });

    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-box">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
