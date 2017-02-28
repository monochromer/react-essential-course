import actions from '../actions/actions';
import api from '../api';

const processStart = () => ({
    type: actions.PROCESS_DATA_START
});

const processEnd = () => ({
    type: actions.PROCESS_DATA_END
})

const loadNotes = () => ({
    type: actions.LOAD_NOTES_REQUEST
});

const createNote = (note) => ({
    type: actions.NOTE_CREATE,
    note
});

const deleteNote = (noteId) => ({
    type: actions.NOTE_DELETE,
    noteId
});

// const NoteActions = {
//     loadNotes() {
//         processStart();

//         AppDispatcher.dispatch({
//             type: actions.LOAD_NOTES_REQUEST
//         });

//         api.listNotes()
//             .then(({ data }) =>
//                 AppDispatcher.dispatch({
//                     type: actions.LOAD_NOTES_SUCCESS,
//                     notes: data
//                 })
//             )
//             .catch(err =>
//                 AppDispatcher.dispatch({
//                     type: actions.LOAD_NOTES_FAIL,
//                     error: err
//                 })
//             )
//             .then(processEnd);
//     },

//     createNote(note) {
//         processStart();

//         api.createNote(note)
//             .then(() => this.loadNotes())
//             .catch(err => console.error(err))
//             .then(processEnd);
//     },

//     deleteNote(noteId) {
//         processStart();
//         api.deleteNote(noteId)
//             .then(() => this.loadNotes())
//             .catch(err => console.error(err))
//             .then(processEnd);
//     }
// };

export default NoteActions;
