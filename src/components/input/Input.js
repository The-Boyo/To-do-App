import React, { useEffect, useState, useRef } from "react"; 

import './Input.css';

export const getMinDate = () => {
  const arr = new Date().toLocaleDateString().split('/');
  const newArr = arr[2]+'-'+arr[0]+'-'+arr[1];
  return newArr;
}

const Input = ({ getInput }) => {
  const [ des, setDes] = useState('');
  const [date, setDate] = useState('');
  const [ minDate, setMin] = useState('');  

  const btnRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getInput(des, date);
    setDes('');
    setDate('');
    btnRef.current.style.backgroundColor = 'rgb(94, 211, 94)';
    setTimeout(() => {
    btnRef.current.style.backgroundColor = '';
    }, 1000);
  }

  const onDesChange = e => {
    setDes(e.target.value);
  }

  const onDateChange = e => {
    setDate(e.target.value);
  }


  useEffect(() => {
    setMin(getMinDate());
  }, [minDate]);


  const capitalise = word => {
    const newArr = word.charAt(0).toUpperCase() + word.slice(1);
    return newArr;
  }


  return (
    <div className="input">
      <form onSubmit={handleSubmit} className="input-container">
        
        <div className="todo-cont">
        <label htmlFor="description" className="label-des" >Enter Todo : </label>
        
        <input type="text" className="description" id="description" placeholder="todo..." value={capitalise(des)} onChange={onDesChange} required />

        </div>
        
        <div className="date-cont">

        <label htmlFor="date" className="label-date">Enter Deadline Date : </label>

        <input type="date" className="date" id="date" value={date} onChange={onDateChange} min={minDate} required />
        
        </div>
        
        <button className="btn-submit" ref={btnRef} >Submit</button>
      </form>

      <div className="icon-cont">
      <a target="_blank" href="https://icons8.com/icon/cjGKAQLQz2TV/calendar" rel="noreferrer">Calendar</a> icon by <a target="_blank" href="https://icons8.com" rel="noreferrer" >Icons8</a>
      </div>
    </div>
  )
}

export default Input;