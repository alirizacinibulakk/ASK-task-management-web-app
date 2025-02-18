import { useContext } from "react"
import { BoardContext, DataContext } from "../App"

export default function DeleteModal({ task, setSelectedTask, setIsModalOpen }){
  const { data, setData } = useContext(DataContext);
  const { currentBoardId, setCurrentBoardId } = useContext(BoardContext);

  function deleteTask(){
    const updatedData = {
      ...data,
      boards: data.boards.map(board =>
        board.id === currentBoardId
          ? {
              ...board,
              columns: board.columns.map(column =>
                  column.name === task.status
                  ? {
                     ...column,
                    tasks: column.tasks.filter(t =>
                    t !== task
                    ),
                   }
                  : column
              ),
            }
          : board
      ),
    };
    setData(updatedData);
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  function deleteBoard(){
    const updatedData = {
      ...data,
      boards: data.boards.filter(board => board.id !== currentBoardId)
    };
    setCurrentBoardId(data.boards.find(x => x.id !== currentBoardId).id);
    setData(updatedData);
    setIsModalOpen(false);
  }

  function handleClick(){
    setIsModalOpen(false);
    setSelectedTask(null);
  }
  
  return(
    <div className="delete-modal-container">
      <h2>Delete this {task ? 'task' : 'board'}?</h2>
      {task ? <p>Are you sure you want to delete the ‘{task.title}’ task and its subtasks? This action cannot be reversed.</p> : <p>Are you sure you want to delete the ‘{data.boards.find(x => x.id == currentBoardId).name}’ board? This action will remove all columns and tasks and cannot be reversed.</p> }
      <div className="delete-modal-buttons">
        <button className="delete-btn" onClick={task ? deleteTask : deleteBoard}>Delete</button>
        <button onClick={handleClick}>Cancel</button>
      </div>
    </div>
  )
}