import { useContext, useState } from "react"
import { BoardContext, DataContext } from "../App"
import TaskDetails from "./TaskDetails";
import EditTask from "./EditTask";
import DeleteModal from "./DeleteModal";

export default function Container(){

  const { data, setData } = useContext(DataContext);
  const { currentBoardId, setCurrentBoardId } = useContext(BoardContext);

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalContent, setModalContent ] = useState('');
  const [ selectedTask, setSelectedTask ] = useState(null);

  if (!data || data.length === 0) return <p>Loading data...</p>;


  function handleClick(task){
    setSelectedTask(task);
    setIsModalOpen(true);
    setModalContent('detail');
  }

  return(
    <div className="container">
      {data?.boards.find(x => x.id == currentBoardId).columns?.map(x => (
        <div className="task-column" key={x.id}>
          <h2><span></span> {x.name}({x.tasks.length})</h2>
          <div className="task-column-container">
            {x.tasks.map(x => (
              <div className="task-column-item" key={x.id} onClick={() => handleClick(x)}>
                <h3>{x.title}</h3>
                <p>{x.subtasks.filter(x => x.isCompleted).length} of {x.subtasks.length} subtasks</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal">
          {modalContent === 'detail' ? <TaskDetails task={selectedTask} setSelectedTask={setSelectedTask} setModalContent={setModalContent} /> :
           modalContent === 'edit' ? <EditTask task={selectedTask} /> : 
           modalContent === 'delete' ? <DeleteModal task={selectedTask} setIsModalOpen={setIsModalOpen} /> :''}
        </div>
      )}
    </div>
  )
}