import { useState } from "react";

 export default function AddBoard({ data, setData }) {
  const [boardName, setBoardName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!boardName.trim()) return;

    const newBoard = {
      id: Date.now(),
      name: boardName,
      columns: [
        { id: 1, name: "Todo", tasks: [] },
        { id: 2, name: "Doing", tasks: [] },
        { id: 3, name: "Done", tasks: [] },
      ],
    };

    setData({ ...data, boards: [...data.boards, newBoard] });
    setBoardName("");
  }

  return (
    <div>
      <h2>Add New Board</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}

