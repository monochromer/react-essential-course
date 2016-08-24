import React from 'react';

import './Task.less';


const Task = (props) => (
    <div className={'Task ' + (props.completed ? 'Task--Completed' : '')}>
        <div className='Task-StatusIcon' onClick={props.onToDoStatusChanged} title="Mark Task as Completed" />
        <div className='Task-Text'>{props.children}</div>
        <button className='Task-Delete' type='button' onClick={props.onToDoDelete} title="Delete Task" />
    </div>
);


export default Task;
