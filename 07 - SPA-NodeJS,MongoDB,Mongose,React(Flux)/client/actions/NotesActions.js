import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import api from '../api';

const processStart = () => {
    AppDispatcher.dispatch({
        type: Constants.PROCESS_DATA_START
    });
}

const processEnd = () => {
    AppDispatcher.dispatch({
        type: Constants.PROCESS_DATA_END
    });
}

const NoteActions = {
    loadNotes() {
        processStart();

        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });

        api.listNotes()
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_NOTES_SUCCESS,
                    notes: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_NOTES_FAIL,
                    error: err
                })
            )
            .then(processEnd);
    },

    createNote(note) {
        processStart();

        api.createNote(note)
            .then(() => this.loadNotes())
            .catch(err => console.error(err))
            .then(processEnd);
    },

    deleteNote(noteId) {
        processStart();
        api.deleteNote(noteId)
            .then(() => this.loadNotes())
            .catch(err => console.error(err))
            .then(processEnd);
    }
};

export default NoteActions;
