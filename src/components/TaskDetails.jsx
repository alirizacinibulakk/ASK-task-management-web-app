import { useContext, useState } from "react"
import { DataContext } from "../App"

export default function TaskDetails({ task }){

  const { data, setData } = useContext(DataContext);
  const [ isSelecting, setIsSelecting ] = useState(false);

  return(
    <>
      <div className="task-details-container">
        <div className="task-details-container-top">
          <h2>{task.title}</h2>
          <img src="" alt="Icon" />
        </div>
        <p className="description">{task.description === '' ? 'No description' : task.description}</p>
        <div className="task-details-subtasks-container">
          <h3>Subtasks ({x.subtasks.filter(x => x.isCompleted).length} of {x.subtasks.length})</h3>
          <div className="task-details-subtasks">
            {task.subtasks.map((x, index) => (
              <div className="task-details-subtask">
                <label htmlFor={`subtask-checkbox-${index}`}>
                  <input checked={x.isCompleted} type="checkbox" name="" id={`subtask-checkbox-${index}`} />
                  <span></span>
                  <p className={x.isCompleted ? 'completed' : null}>{x.title}</p>
                </label>
              </div>
            ))}
          </div>
          <div className="task-detail-status">
            <button className={`task-detail-trigger ${isSelecting ? 'selecting' : ''}`}>{task.status} <img src="" alt="Icon" /></button>
          </div>
        </div>
      </div>
    </>
  )
}