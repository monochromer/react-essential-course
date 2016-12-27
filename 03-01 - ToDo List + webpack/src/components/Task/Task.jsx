import React from 'react';

import './Task.less';


const Task = (props) => {
  return (
    <div className={'Task' + (props.completed ? ' Task--Completed' : '')}>
        <div className='Task-StatusIcon'
            title={props.completed ? 'Mark Task as Uncompleted' : 'Mark Task as Completed'}
            onClick={props.onToDoStatusChanged}
        />
        <div className='Task-Text'>{props.children}</div>
        <button className='Task-Delete'
            title="Delete Task"
            type='button'
            onClick={props.onToDoDelete}
        />
    </div>
  )
};


export default Task;
