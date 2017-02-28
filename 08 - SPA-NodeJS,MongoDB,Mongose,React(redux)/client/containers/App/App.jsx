import React from 'react';

import NotesStore from '../../stores/NotesStore';
import NotesActions from '../../actions/NotesActions';

import './App.less';
import NoteEditor from '../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../NotesGrid/NotesGrid.jsx';
import Loader from '../Loader/Loader.jsx';


function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        isProcess: NotesStore.isProcess(),
        notes: NotesStore.getNotes()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        NotesActions.loadNotes();
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState(getStateFromFlux());
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    render() {
        return (
            <div className='App'>
                <Loader isActive={this.state.isProcess} />
                <h2 className='App__header'>NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    }
});

export default App;
