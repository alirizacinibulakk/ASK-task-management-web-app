import { useContext, useState } from "react";
import { DataContext } from "../App";

export default function AddNewTask() {
  const { data, setData } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [status, setStatus] = useState("Todo");

  function handleAddSubtask() {
    setSubtasks([...subtasks, ""]);
  }

  function handleChangeSubtask(index, value) {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  }

  function handleRemoveSubtask(index) {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      subtasks: subtasks.map((sub) => ({ title: sub, isCompleted: false })),
    };

    const updatedBoards = data.boards.map((board) => {
      if (board.id === 0) {
        return {
          ...board,
          columns: board.columns.map((col) =>
            col.name === status ? { ...col, tasks: [...col.tasks, newTask] } : col
          ),
        };
      }
      return board;
    });

    setData({ ...data, boards: updatedBoards });
    setTitle("");
    setDescription("");
    setSubtasks([""]);
  }

  return (
    <div className="modal-content">
      <h2 className="modal-title">Add New Task</h2>
      <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-title"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-description"
              />
              {subtasks.map((subtask, index) => (
                <div key={index} className="subtask-item">
                  <input
                    type="text"
                    value={subtask}
                    onChange={(e) => handleChangeSubtask(index, e.target.value)}
                    className="input-subtask"
                  />
                  <button type="button" onClick={() => handleRemoveSubtask(index)} className="btn-remove-subtask">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddSubtask} className="btn-add-subtask">
                + Add New Subtask
              </button>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="select-status">
                {data.boards[0].columns.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
              <div className="form-actions">
                <button type="button" className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-create-task">
                  Create Task
                </button>
              </div>
      </form>
    </div>
  );
}

