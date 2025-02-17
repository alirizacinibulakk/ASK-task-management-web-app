import { createContext, useEffect, useState } from 'react'
import './App.css'
import Container from './components/Container'
import Header from './components/Header'
import AddNewTask from './components/AddNewTask';

export const DataContext = createContext(null);

export default function App() {

  const [ data, setData ] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json());
      setData(data);
      console.log(data)
    }
    getData();
  }, []);


  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <Header />
        <AddNewTask data={data} setData={setData} />
        <Container />
      </DataContext.Provider>
    </>
  )
}