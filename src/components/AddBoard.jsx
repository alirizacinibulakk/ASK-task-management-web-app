import { useContext, useState } from "react";
import { BoardContext, DataContext, ModalContext } from "../App";

export default function AddBoard({ }) {
  const { data, setData } = useContext(DataContext);
  const { setCurrentBoardId } = useContext(BoardContext);
  const { setIsModalOpen } = useContext(ModalContext);

  const [ newColumns, setNewColumns ] = useState([{ id: 0, name: '', tasks: []}]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.boardName.value.trim()) return;

    const newColumnsNames = newColumns.map((x, index) => (
      { id: x.id, 
        name: e.target.columnName.value ? e.target.columnName.value : e.target.columnName[index].value, 
        tasks: [] 
      }
    ));

    const newBoard = {
      id: data.boards[data.boards.length - 1].id + 1,
      name: e.target.boardName.value,
      columns: [...newColumnsNames],
    };

    setData({ ...data, boards: [...data.boards, newBoard] });
    setCurrentBoardId(newBoard.id);
    setIsModalOpen(false);
  }

  function handleClick(){
    const newColumn = { id: newColumns[newColumns.length - 1].id + 1, name: '', tasks: [] };
    setNewColumns([...newColumns, newColumn]);
  }

  return (
    <div>
      <h2>Add New Board</h2>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input type="text" placeholder="e.g. Web Design" name="boardName" />
        <div className="new-columns-input-container">
          <p>Columns</p>
          {newColumns.map(x => (
            <div className="new-column-input" key={x.id}>
              <input name="columnName" type="text" />
              <img src="/images/deleteBtn.svg" />
            </div>
          ))}
          <button type="button" onClick={handleClick}>+ Add New Column</button>
        </div>
        <button type="submit">Create New Board</button>
      </form>
    </div>
  );
}
