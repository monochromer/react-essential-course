import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actionsCreators/NotesActionsCreators';

import './App.css';
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import NotesGrid from '../../components/NotesGrid/NotesGrid';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchValue: ''
        }
    }

    componentDidMount() {
        var { dispatch, noteActions } = this.props;
        noteActions.loadNotes();
    }

    handleSearch = (text) => {
        var text = text.trim().toLowerCase();
        this.setState({
            searchValue: text
        });
    }

    filterNotes(notes) {
        var text = this.state.searchValue;
        var notes = notes.slice();
        var filteredNotes = notes.filter(function(note) {
            return note.text.toLowerCase().indexOf(text) !== -1
                || note.title.toLowerCase().indexOf(text) !== -1
        });
        return filteredNotes;
    }

    render() {
        var { notes, loading, noteActions } = this.props;
        var { createNote, deleteNote } = noteActions;
        var filteredNotes = this.filterNotes(notes);

        return (
            <div className='App'>
                <Loader isActive={loading} />

                <h2 className='App-Header'>NotesApp</h2>
                <NoteEditor onNoteAdd={createNote} />
                <SearchForm onSearch={this.handleSearch} />

                <div style={{
                    padding: '0 16px 16px',
                    textAlign: 'center',
                    display: !!this.state.searchValue ? 'block' : 'none'
                }}>
                    Find notes: {filteredNotes.length} of {notes.length}
                </div>
                <NotesGrid notes={filteredNotes} onNoteDelete={deleteNote} />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    notes: state.notes,
    loading: state.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    noteActions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
