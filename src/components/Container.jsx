import { useContext } from "react"
import { BoardContext, DataContext } from "../App"

export default function Container(){

  const { data, setData } = useContext(DataContext);
  const { currentBoardId, setCurrentBoardId } = useContext(BoardContext);

  console.log(data);


  console.log(data?.find(x => x.id == currentBoardId));

  function handleClick(task){

  }

  return(
    <div className="container">
      {data.find(x => x.id == currentBoardId).columns.map(x => (
        <div className="task-column">
          <h2><span></span> {x.name}({x.tasks.length})</h2>
          <div className="task-column-container">
            {x.tasks.map(x => (
              <div className="task-column-item" onClick={() => handleClick(x)}>
                <h3>{x.title}</h3>
                <p>{x.subtasks.filter(x => x.isCompleted).length} of {x.subtasks.length} subtasks</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}