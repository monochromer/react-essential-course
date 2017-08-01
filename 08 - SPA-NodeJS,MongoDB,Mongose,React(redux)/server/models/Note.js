import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String
    },
    color: {
        type: String
    },
    createdAt: {
        type: Date
    }
});

export default mongoose.model('Note', NoteSchema);
