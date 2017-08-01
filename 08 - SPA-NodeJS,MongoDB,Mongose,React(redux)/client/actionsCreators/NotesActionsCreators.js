import actions from '../actions/actions';
import api from '../api';


export const loadNotes = () => dispatch => {
    dispatch({ type: actions.PROCESS_DATA_START });

    dispatch({ type: actions.LOAD_NOTES_REQUEST });
    api.listNotes()
        .then(({ data }) => dispatch({
            type: actions.LOAD_NOTES_SUCCESS,
            notes: data
        }))
        .catch(e => dispatch({ type: actions.LOAD_NOTES_FAIL}))
        .then(() =>  dispatch({ type: actions.PROCESS_DATA_END }))

};

export const createNote = (note) => dispatch => {
    dispatch({ type: actions.PROCESS_DATA_START });

    api.createNote(note)
        .then(({ data }) => dispatch({
            type: actions.NOTE_CREATE,
            note: data
        }))
        .catch(e => console.error(e))
        .then(() =>  dispatch({ type: actions.PROCESS_DATA_END }))
};

export const deleteNote = (noteId) => dispatch => {
    dispatch({ type: actions.PROCESS_DATA_START });

    api.deleteNote(noteId)
        .then(({ data }) => dispatch({
            type: actions.NOTE_DELETE,
            noteId
        }))
        .catch(e => console.error(e))
        .then(() =>  dispatch({ type: actions.PROCESS_DATA_END }))
};
