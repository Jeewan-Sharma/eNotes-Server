import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true,
    }
});

export const NoteModel = mongoose.model('Note', NoteSchema);

export const GetNoteById = (id: string) => NoteModel.findById(id);

export const GetNotes = (id: string) => NoteModel.find({ userId: id });

export const CreateNotes = (values: Record<string, any>) => new NoteModel(values).save().then((note) => note.toObject());

export const DeleteNoteById = (id: string) => NoteModel.findByIdAndDelete(id);
