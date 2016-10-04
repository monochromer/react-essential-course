import React from 'react';

import './AddFrom.less';


class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.addTask = this.addTask.bind(this);
        /**
         * Варианты привязки this (возможно, понадобятся настройки babel)
         *
         * свойство класса this.addTask = () => this.addTask()
         * метод класса         addTask = () => this.addTask()
         * bind syntax          this.addTask = ::this.addTask
         */
    }

    onChangeText(e) {
        var text = e.target.value;
        this.setState({
            text: text
        });
    }

    addTask(e) {
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
    }

    render() {
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
};


export default AddForm;
