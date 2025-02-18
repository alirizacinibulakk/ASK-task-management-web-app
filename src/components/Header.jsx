import { useState, useContext, useEffect } from "react";
import { DataContext, BoardContext } from "../App";

export default function Header() {
  const { data, setData } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);
  const { currentBoardId, setCurrentBoardId } = useContext(BoardContext);
  const [currentBoardName, setCurrentBoardName] = useState('');


  useEffect(() => {
    if (data.boards && data.boards.length > 0) {
      const currentBoard = data.boards.find(board => board.id === currentBoardId);
      if (currentBoard) {
        setCurrentBoardName(currentBoard.name);
      }
    }
  }, [currentBoardId, data.boards]);

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
        <img className="header-logo" src="\images\logo.svg" alt="logo" />
        <button className="toggle-menu-btn" onClick={toggleMenu}>
          <span>{currentBoardName}</span>
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
          </svg>
        </button>
        <div className="header-btn-right">
          <button className="plus-btn"><img src="\images\+.svg" alt=""/></button>
          <div className="modal-container">
            <button className="dot-btn" onClick={toggleModal}><img src="\images\three-dot.svg" alt="" /></button>
            {modal ? (
              <div className="three-dot-modal">
                <button>Edit Board</button>
                <button>Delete Board</button>
              </div>

            ) : null}
          </div>
        </div>
      </header>

      {isOpen ? (
        <div className="boards-menu-container">
          <div className="boards-menu">
            <h2>All Boards ({data.boards.length})</h2>
            <div className="boards">
              {data.boards.map(board => (
                <button key={board.id} className={currentBoardId === board.id ? 'active' : ''} onClick={() => setCurrentBoardId(board.id)}>
                  <img src="\images\fluent_board.svg" alt="" /> {board.name}
                </button>
              ))}
            </div>
            <button><img src="\images\fluent_board.svg" alt="" /> +Create New Board</button>
            <div className="theme-container">
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
        </div>

      ) : null}
    </>
  );
}