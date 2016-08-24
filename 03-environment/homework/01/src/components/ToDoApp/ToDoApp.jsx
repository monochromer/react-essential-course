import React from 'react';

import ToDoList from '../ToDoList/ToDoList.jsx';
import AddForm from '../AddForm/AddForm.jsx';
import FilterForm from '../FilterForm/FilterForm.jsx';

import './ToDoApp.less';


class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filterType: 'all'
        };
        this.onChangeFilterType = this.onChangeFilterType.bind(this);
        this.changeTaskStatus = this.changeTaskStatus.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount() {
        var tasks = localStorage.getItem('tasks');

        if(tasks) {
            tasks = JSON.parse(tasks);
            this.setState({tasks: tasks});
        }
    }

    componentDidUpdate() {
       this.updateLocalStorage();
    }

    updateLocalStorage() {
        var tasks = JSON.stringify(this.state.tasks);
        localStorage.setItem('tasks', tasks);
    }

    onChangeFilterType(type) {
        this.setState({
            filterType: type
        })
    }

    changeTaskStatus(task) {
        var tasks = this.state.tasks.slice();
        var index = tasks.indexOf(task);
        tasks[index].completed = !tasks[index].completed;
        this.setState({ tasks: tasks});
    }

    deleteTask(task) {
        var tasks = this.state.tasks.slice();
        var index = tasks.indexOf(task);
        tasks.splice(index, 1);
        this.setState({ tasks: tasks});
    }

    addTask(task) {
        var tasks = this.state.tasks.slice();
        tasks.push(task);
        this.setState({ tasks: tasks});
    }

    render() {
        return (
            <div className='ToDoApp'>
                <AddForm onTaskAdd={this.addTask}/>

                <FilterForm
                    types={['all', 'completed', 'active']}
                    onChangeFilterType={this.onChangeFilterType}
                />

                <ToDoList
                    filterType={this.state.filterType}
                    tasks={this.state.tasks}
                    onToDoStatusChanged={this.changeTaskStatus}
                    onToDoDelete={this.deleteTask}
                />
            </div>
        );
    }
};


export default ToDoApp;
