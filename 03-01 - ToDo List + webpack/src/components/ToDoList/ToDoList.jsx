import React from 'react';

import Task from '../Task/Task.jsx';

import './ToDoList.less';


const ToDoList = (props) => {
  var changedCallback = props.onToDoStatusChanged;
  var deleteCallback = props.onToDoDelete;

  const tasks = props.tasks.map((task, index) => {
    return (
      <li key={task.id} className='ToDoList-Item'>
          <Task
              completed={task.completed}
              onToDoDelete={deleteCallback.bind(null, task)}
              onToDoStatusChanged={changedCallback.bind(null, task)}
          >
              {task.text}
          </Task>
      </li>
    )
  });

  return (
    <ul className='ToDoList'>{tasks}</ul>
  )
};


export default ToDoList;
