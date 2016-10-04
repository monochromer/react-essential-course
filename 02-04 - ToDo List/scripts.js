var Task = React.createClass({
    render: function() {
        return (
            <div className={'Task' + (this.props.completed ? ' Task--Completed' : '')}>
                <div className='Task-StatusIcon' onClick={this.props.onToDoStatusChanged} title="Mark Task as Completed" />
                <div className='Task-Text'>{this.props.children}</div>
                <button className='Task-Delete' type='button' onClick={this.props.onToDoDelete} title="Delete Task" />
            </div>
        )
    }
});


var ToDoList = React.createClass({
    getInitialState: function() {
        return {
            filterType: this.props.filterType
        }
    },

    filterListActions: {
        completed: function(tasks) {
            return tasks.filter(function(task) {
                return task.completed === true;
            });
        },

        active: function(tasks) {
            return tasks.filter(function(task) {
                return task.completed === false;
            });
        },

        all: function(tasks) {
            return tasks;
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            filterType: nextProps.filterType
        });
    },

    render: function() {
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
});


var AddForm = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        }
    },

    onChangeText: function(e) {
        var text = e.target.value;
        this.setState({
            text: text
        });
    },

    addTask: function(e) {
        e.preventDefault();

        var text = this.state.text;
        if (text.trim() === '') return;

        var task = {
            text: text,
            completed: false
        };
        var onTaskAdd = this.props.onTaskAdd;
        onTaskAdd(task);

        this.setState({
            text: ''
        });
    },

    render: function() {
        return (
            <form className='AddForm' onSubmit={this.addTask}>
                <input
                    className='AddForm-Input'
                    type='text'
                    placeholder='Enter todo task...'
                    value={this.state.text}
                    onChange={this.onChangeText}
                />
            </form>
        );
    }
});


var FilterForm = React.createClass({
    getInitialState: function() {
        return {
            filterType: 'all' // [all, completed, active]
        }
    },

    changeFilterType: function(type) {
        var changeCallback = this.props.onChangeFilterType;
        changeCallback(type);

        this.setState({
            filterType: type
        });
    },

    render: function() {
        var self = this;
        return (
            <div className='Filter'>
                {this.props.types.map(function(type, index) {
                    return (
                        <div key={index}
                            className={'FilterType ' + (self.state.filterType === type ? 'FilterType--Active' : '')}
                            onClick={self.changeFilterType.bind(self, type)}
                        >
                            <div className='FilterType-Icon'></div>
                            <div className='FilterType-Text'>{type}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
});


var ToDoApp = React.createClass({
    getInitialState: function() {
        return {
            tasks: [],
            filterType: 'all'
        }
    },

    componentWillMount() {
        var tasks = localStorage.getItem('tasks');

        if(tasks) {
            tasks = JSON.parse(tasks);
            this.setState({tasks: tasks});
        }
    },

    componentDidUpdate() {
        this.updateLocalStorage();
   },

    updateLocalStorage() {
        var tasks = JSON.stringify(this.state.tasks);
        localStorage.setItem('tasks', tasks);
    },

    onChangeFilterType: function(type) {
        this.setState({
            filterType: type
        })
    },

    changeTaskStatus: function(task) {
        var tasks = this.state.tasks.slice();
        var index = tasks.indexOf(task);
        tasks[index].completed = !tasks[index].completed;
        this.setState({ tasks: tasks});
    },

    deleteTask: function(task) {
        var tasks = this.state.tasks.slice();
        var index = tasks.indexOf(task);
        tasks.splice(index, 1);
        this.setState({ tasks: tasks});
    },

    addTask: function(task) {
        var tasks = this.state.tasks.slice();
        tasks.push(task);
        this.setState({ tasks: tasks});
    },

    render: function() {
        return (
            <div className='ToDoApp'>
                <AddForm onTaskAdd={this.addTask} />

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
});


ReactDOM.render(
    <ToDoApp />,
    document.getElementById('mount-point')
);
