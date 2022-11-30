import React, { useRef } from "react";

import './List.css';


const List = ({ todos, deleteTodo }) => {

  const desRef = useRef();
  const dateRef = useRef();
  
    const onCheckboxChange = (e) => {
       todos.forEach(plan => { 
        if (plan.des === e.target.parentElement.parentElement.id) {
           const par = e.target.parentElement.parentElement;
  
           if (par.children[0].style.textDecoration === '') {
             par.children[0].style.textDecoration = 'line-through';
             par.children[1].style.textDecoration= 'line-through';
           } else {
            par.children[0].style.textDecoration = '';
            par.children[1].style.textDecoration= '';
           } 
        }
      })
    }

  const removeTodo = e => {
    if(e.target.parentElement.parentElement.children[0].style.textDecoration === 'line-through') {
      deleteTodo(e.target.parentElement.parentElement.id);
    } else {
      e.target.parentElement.children[1].style.display = 'block';
      setTimeout(()=> {
      e.target.parentElement.children[1].style.display = 'none';
      }, 1500);
      return
    }
  }

  
  const setDeadline = date => {
    const dt = new Date(date).getTime();
    const now = new Date().getTime();
    const diff =  dt - now;
    const days = Math.floor((diff % (1000*60*60*24*(365/12))) / (1000*60*60*24));
    const months = Math.floor((diff % (1000*60*60*24*365)) / (1000*60*60*24*(365/12)))
    const years = Math.floor(diff / (1000*60*60*24*365));
    
    if(years > 0 && months > 0 && days > 0) {
      return `${years}y ${months}m ${days}d`;
    }

    else if (years > 0 && months === 0 && days === 0) {
      return `${years}y`
    }

    else if (years > 0 && months > 0 && days === 0) {
      return `${years}y ${months}m`
    }

    else if (years > 0 && months === 0 && days > 0) {
      return `${years}y ${days}d`
    }

    else if (years === 0 && months > 0 && days > 0){
      return `${months}m ${days}d`;
    }

    else if (years === 0 && months === 0 && days > 0) {
      return `${days}d`
    }

    else if (years === 0 && months > 0 && days === 0) {
      return `${months}m`
    }

    else {
      return `Date due`;
    }

  }

  const deadlineColor = word => {
    if (word.length < 3) return 'rgb(224, 121, 121)';
    
    else if (word === 'Date due') return 'red';

    else return '';
  }


  const renderItem = () => {
    return todos.map(todo =>{
      return (
        <div className="item-cont" key={todo.des} id={todo.des}>
          
          <li className={`li-todo`} ref={desRef} style={{color: `${deadlineColor(setDeadline(todo.date))}`}} >{todo.des} </li>
          
          <li className="li-deadline" ref={dateRef} style={{color: `${deadlineColor(setDeadline(todo.date))}`}} >{setDeadline(todo.date)}</li>
          
          <li className="li-completed"><input type="checkbox" onChange={onCheckboxChange} style={{border:'none'}} /></li>
          
          <li className="li-delete"><i className="fa-solid fa-circle-xmark" onClick={removeTodo} ></i><span className="mark">Mark as completed first</span></li>
        </div>
      )
    })
  }

  return (
    <div className="list">
      <div className="headers">
        <h3 className="todo">Todo</h3>
        <h3 className="deadline">Deadline</h3>
        <h3 className="completed">Completed</h3>
        <h3 className="delete">Delete</h3>
      </div>
      <ul className="items">
        {renderItem()}
      </ul>
    </div>
  )
}

export default List;