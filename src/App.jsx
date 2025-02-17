import { createContext, useEffect, useState } from 'react'
import './App.css'
import Container from './components/Container'
import Header from './components/Header'

export const DataContext = createContext(null);
export const BoardContext = createContext(null);

export default function App() {

  const [ data, setData ] = useState([]);
  const [ currentBoardId, setCurrentBoardId ] = useState(0);

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json());
      setData(data);
    }
    getData();
  }, []);


  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <BoardContext.Provider value={{ currentBoardId, setCurrentBoardId }}>
          <Header />
          <Container />
        </BoardContext.Provider>
      </DataContext.Provider>
    </>
  )
}