import axios from 'axios';
import config from '../../etc/config';

const { clientApiUrl } = config;

export default {
    listNotes() {
        return axios.get(`${clientApiUrl}/notes`);
    },

    createNote(data) {
        return axios.post(`${clientApiUrl}/notes`, data);
    },

    deleteNote(noteId) {
        return axios.delete(`${clientApiUrl}/notes/${noteId}`);
    }
}
