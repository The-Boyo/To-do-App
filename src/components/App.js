import React, { useEffect, useState } from "react";

import Input from "./input/Input";
import List from "./todos/List";
import './App.css';


const App = () => {

  const [data, setData] = useState([]);

  const getInput = (des, date) => {
    setData([...data, { des, date }]);
    localStorage.setItem('todos', JSON.stringify([...data, { des, date }]));
  }
  
  const deleteTodo = id => {
    const newData = data.filter(dats => dats.des !== id);
    localStorage.removeItem('todos');
    setData(newData);
    localStorage.setItem('todos', JSON.stringify(newData));
  }

  
  useEffect(()=> {
    setData(JSON.parse(localStorage.getItem('todos')));
  }, [])


  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Planner</h1>
      </header>
      < Input getInput={getInput} />
      < List todos= {data} deleteTodo={deleteTodo} />
    </div>
  )
}

export default App;