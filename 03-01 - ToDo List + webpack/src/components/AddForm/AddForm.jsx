import React from 'react';

import './AddFrom.less';


class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        /**
         * Варианты привязки this (возможно, понадобятся настройки babel)
         *
         * свойство класса this.addTask = () => this.addTask()
         * метод класса         addTask = () => this.addTask()
         * bind syntax          this.addTask = ::this.addTask
         */
    }

    addTask(e) {
        var input = this.input;
        var text = input.value;
        if (text.trim() === '') return false;

        this.props.onTaskAdd(text);

        input.value = '';
        e.preventDefault();
    }

    render() {
        return (
             <form className='AddForm' onSubmit={this.addTask}>
                <input
                    className='AddForm-Input'
                    ref={input => this.input = input}
                    type='text'
                    placeholder='Enter todo task...'
                    defaultValue=''
                />
            </form>
        );
    }
};


export default AddForm;
