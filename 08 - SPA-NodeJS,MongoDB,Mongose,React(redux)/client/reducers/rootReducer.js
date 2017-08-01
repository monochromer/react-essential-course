import { combineReducers } from 'redux';
import constants from '../actions/actions';

/*
 store shape:
    notes: [
        {
            id,
            title,
            text,
            color,
            createdAt
        }
    ],
    loading: true | false
*/
function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: note.color || '#fff',
        createdAt: note.createdAt
    };
}

const loading = (state = true, action) => {
    switch (action.type) {
        case constants.PROCESS_DATA_START:
            return true;

        case constants.PROCESS_DATA_END:
            return false;

        default:
            return state;
    }
}

const notes = (state = [], action) => {
    switch (action.type) {
        case constants.LOAD_NOTES_SUCCESS:
            return action.notes.map(note => formatNote(note));

        case constants.NOTE_CREATE:
            return [...state, formatNote(action.note)];

        case constants.NOTE_DELETE:
            return state.filter(note => note.id !== action.noteId);

        default:
            return state;
    }
}

const root = combineReducers({
    loading,
    notes
});

export default root;