import React, { Component } from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import './NoteEditor.css';

const COLORS = ['#ffffff', '#80d8ff', '#ffff8d', '#ff8a80', '#ccff90', '#cfd8dc', '#ffd180'];

class NoteEditor extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
            color: '#ffffff'
        };
    }

    onChange = (event) => {
        var { name, value } = event.target;
        this.setState((prevState, props) => ({
            [name]: value
        }))
    };

    handleNoteAdd() {
        const newNote = {
            ...this.state
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '', title: '', color: '#fffff' });
        this.form.reset();
    }

    onSubmit = (event) => {
        this.handleNoteAdd();
        event.preventDefault();
    };

    render() {
        return (
            <form
                className='NoteEditor'
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                ref={c => this.form = c}
            >
                <input
                    type='text'
                    name='title'
                    className='NoteEditor-Title'
                    placeholder='Enter title'
                    defaultValue={this.state.title}
                    required
                />
                <textarea
                    placeholder='Enter note text'
                    rows={5}
                    name='text'
                    className='NoteEditor-Text'
                    defaultValue={this.state.text}
                />
                <div className='NoteEditor-Footer'>
                     <ColorPicker
                        value={this.state.color}
                        colors={COLORS}
                        name='color'
                    />
                    <button
                        className='NoteEditor-Button'
                        disabled={!this.state.title}
                    >
                        Add
                    </button>
                </div>
            </form>
        );
    }
};

export default NoteEditor;
