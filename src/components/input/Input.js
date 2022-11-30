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
    btnRef.current.innerHTML = 'Submitted';
    setTimeout(() => {
    btnRef.current.style.backgroundColor = '';
    btnRef.current.innerHTML = 'Submit';
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
        <label htmlFor="description" className="label-des" >Enter Todo :<input type="text" className="description" id="description" placeholder="todo..." value={capitalise(des)} onChange={onDesChange} required />
        </label>
        <label htmlFor="date" className="label-date">Enter Deadline Date :
        <input type="date" className="date" id="date" value={date} onChange={onDateChange} min={minDate} required />
        </label>
        <button className="btn-submit" ref={btnRef} >Submit</button>
      </form>
    </div>
  )
}

export default Input;