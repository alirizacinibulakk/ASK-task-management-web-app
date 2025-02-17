import { useContext } from "react"
import { BoardContext, DataContext } from "../App"

export default function DeleteModal({ task, setIsModalOpen }){
  const { data, setData } = useContext(DataContext);
  const { currentBoardId } = useContext(BoardContext);

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
  }

  function handleClick(){
    setIsModalOpen(false);
  }

  return(
    <div className="delete-modal-container">
      <h2>Delete this task?</h2>
      <p>Are you sure you want to delete the ‘{task.title}’ task and its subtasks? This action cannot be reversed.</p>
      <div className="delete-modal-buttons">
        <button className="delete-btn" onClick={deleteTask}>Delete</button>
        <button onClick={handleClick}>Cancel</button>
      </div>
    </div>
  )
}