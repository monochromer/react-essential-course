import React from 'react';

import Task from '../Task/Task.jsx';

import './ToDoList.less';

class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    shouldComponentUpdate(nextProps, nexState) {
        var cond = nextProps.task.completed !== this.props.completed;
        return cond;
    }
    
    render() {
        var props = this.props;
        return (
            <li className='ToDoList-Item'>
                <Task
                    completed={props.task.completed}
                    onToDoDelete={props.deleteCallback.bind(null, props.task)}
                    onToDoStatusChanged={props.changedCallback.bind(null, props.task)}
                >
                    {props.task.text}
                </Task>
            </li>
        )
    }
};


const ToDoList = (props) => {
  var changedCallback = props.onToDoStatusChanged;
  var deleteCallback = props.onToDoDelete;

  const tasks = props.tasks.map((task) => {
    return (
        <ToDoListItem
            key={task.id}
            task={task}
            changedCallback={changedCallback}
            deleteCallback={deleteCallback}
        />
    )
  });

  return (
    <ul className='ToDoList'>
        {tasks}
    </ul>
  )
};


export default ToDoList;
