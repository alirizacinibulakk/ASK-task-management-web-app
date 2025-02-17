import { useState, useContext } from "react";
import { DataContext } from "../App";

export default function Header() {
  const { data, setData } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [checked, setChecked] = useState(true);


  function toggleMenu() {
    setIsOpen(!isOpen);
    setModal(false);
  }

  function toggleModal() {
    setModal(!modal);
    setIsOpen(false);
  }


  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
      console.log("light")
    } else {
      setTheme('dark');
      console.log("dark")
    }
    setChecked(!checked);
    console.log(checked)
  }

  return (
    <>
      <header>
        <img src="\images\logo.svg" alt="logo" />
        <button onClick={toggleMenu}>
          <h1>currentBoard</h1>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
          </svg>
        </button>
        <button>+</button>
        <button onClick={toggleModal}><img src="\images\three-dot.svg" alt="" /></button>
      </header>

      {modal ? (
        <div className="three-dot-modal">
          <button>Edit Board</button>
          <button>Delete Board</button>
        </div>
      ) : null}

      {isOpen ? (
        <div className="boards-menu">
          <h2>All Boards ({data.boards.length})</h2>
          <div className="boards">
            {data.boards.map(board => (
              <button key={board.id} onClick={() => setCurrentBoard(board.name)}><img src="\images\fluent_board.svg" alt="" /> {board.name}</button>
            ))}
          </div>
          <button><img src="\images\fluent_board.svg" alt="" /> +Create New Board</button>
          <div className="theme">
            <label className="theme-switch">
              <img src="\images\light-theme.svg" alt="" />
              <input
                id="modeSwitchBtn"
                className="switch"
                type="checkbox"
                checked={checked}
                onChange={toggleTheme}
              />
              <img src="\images\dark-theme.svg" alt="" />
            </label>
          </div>
        </div>
      ) : null}
    </>
  );
}