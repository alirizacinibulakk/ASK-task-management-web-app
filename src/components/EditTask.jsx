import { useContext, useState } from "react";
import { BoardContext, DataContext } from "../App";

export default function EditTask({ task, setSelectedTask }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const { data, setData } = useContext(DataContext);
  const { currentBoardId } = useContext(BoardContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.title.value.trim()) return;

    const updatedTask = {
      ...task,
      title: e.target.title.value,
      description: e.target.description.value,
      subtasks: task.subtasks.map((sub) => ({
        title: e.target.subtaskTitle.value,
        isCompleted: sub.isCompleted,
      })),
    };
    const updatedData = {
      ...data,
      boards: data.boards.map(board =>
        board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map(column =>
                column.name === updatedTask.status
                  ? {
                      ...column,
                      tasks: column.tasks.map(t =>
                        t === task
                          ? updatedTask : t
                      ),
                    }
                  : column
              ),
            }
          : board
      ),
    };
    console.log(updatedTask);
    console.log(updatedData);
    setData(updatedData);
  }

  function triggerMenu() {
    setIsSelecting(!isSelecting);
  }

  function handleClick(status) {
    const updatedTask = {
      ...task,
      status: status,
    };
    setSelectedTask(updatedTask);
    setIsSelecting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Edit Task</h2>
        <h3>title</h3>
        <input type="text" defaultValue={task.title} name="title" />
        <textarea
          defaultValue={task.description}
          placeholder="e.g. It’s always good to take a break. This 
        15 minute break will  recharge the batteries 
        a little."
          name="description"
        />
        <div className="editTask-subtasksContainer">
          <h3>Subtasks</h3>
          {task.subtasks.length > 0 ? (
            task.subtasks.map((subtask, index) => (
              <div key={index} className="editTask-subtask">
                <input
                  type="text"
                  defaultValue={subtask.title}
                  name="subtaskTitle"
                />
                <button
                  onClick={() => {
                    task.subtasks.splice(index, 1);
                    setNewTitle(task.title);
                  }}
                >
                  <img src="/images/deleteBtn.svg" alt="" />
                </button>
              </div>
            ))
          ) : (
            <>
              <div className="editTask-subtask">
                <input
                  type="text"
                  placeholder="e.g. Make coffee"
                  name="subtaskTitle"
                />
                <button>
                  <img src="/images/deleteBtn.svg" alt="" />
                </button>
              </div>
              <div className="editTask-subtask">
                <input
                  type="text"
                  placeholder="e.g. Drink coffee & smile"
                  name="subtaskTitle"
                />
                <button>
                  <img src="/images/deleteBtn.svg" alt="" />
                </button>
              </div>
            </>
          )}
          <button>+ Add New Subtask</button>
        </div>
        <div className={`task-detail-status ${isSelecting ? "selecting" : ""}`}>
          <h3>Status</h3>
          <button
            onClick={triggerMenu}
            className={`task-detail-trigger ${isSelecting ? "selecting" : ""}`}
          >
            {task.status} <img src="/images/arrow-down.svg" alt="Icon" />
          </button>
          <div className="task-detail-options">
            {data.boards
              .find((x) => x.id == currentBoardId)
              .columns.map((x) => x.name)
              .map((x, index) => (
                <p onClick={() => handleClick(x)} key={index}>
                  {x}
                </p>
              ))}
          </div>
        </div>
        <button type="submit">Create Task</button>
      </div>
    </form>
  );
}
