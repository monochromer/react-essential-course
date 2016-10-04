import React from 'react';

import Task from '../Task/Task.jsx';

import './ToDoList.less';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: this.props.filterType
        };

        this.filterListActions = {
            completed: function(tasks) {
                return tasks.filter(function(task) {
                    return task.completed;
                });
            },

            active: function(tasks) {
                return tasks.filter(function(task) {
                    return !task.completed;
                });
            },

            all: function(tasks) {
                return tasks;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filterType: nextProps.filterType
        });
    }

    render() {
        var changedCallback = this.props.onToDoStatusChanged;
        var deleteCallback = this.props.onToDoDelete;
        var tasks = this.filterListActions[this.state.filterType](this.props.tasks.slice());

        return (
            <ul className='ToDoList'>
                {tasks.map(function(task, index) {
                    return (
                        <li key={index} className='ToDoList-Item'>
                            <Task
                                completed={task.completed}
                                onToDoDelete={deleteCallback.bind(null, task)}
                                onToDoStatusChanged={changedCallback.bind(null, task)}
                            >
                                {task.text}
                            </Task>
                        </li>
                    )
                })}
            </ul>
        )
    }
};


export default ToDoList;
