import { useState, useContext, useEffect } from "react";
import { DataContext, BoardContext, ModalContext } from "../App";

export default function Header() {
  const { data, setData } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);
  const { currentBoardId, setCurrentBoardId } = useContext(BoardContext);
  const [currentBoardName, setCurrentBoardName] = useState('');
  const { modalContent, setModalContent, isModalOpen, setIsModalOpen } = useContext(ModalContext);


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

  function openDeleteModal() {
    setModalContent("delete");
    setIsModalOpen(true);
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
          <button onClick={() => {
            setModalContent("add");
            setIsModalOpen(true);
          }} className="plus-btn"><img src="\images\+.svg" alt="" /></button>
          <div className="modal-container">
            <button className="dot-btn" onClick={toggleModal}><img src="\images\three-dot.svg" alt="" /></button>
            {modal ? (
              <div className="three-dot-modal">
                <button>Edit Board</button>
                <button onClick={openDeleteModal}>Delete Board</button>
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill="white" />
                  </svg>
                  {board.name}
                </button>
              ))}
            </div>
            <button>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill="white" />
              </svg> + Create New Board</button>
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