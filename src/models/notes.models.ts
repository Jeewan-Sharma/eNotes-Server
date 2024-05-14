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

export const GetNotes = () => NoteModel.find();

export const CreateNotes = (values: Record<string, any>) => new NoteModel(values).save().then((note) => note.toObject());

// export const getNotesByUser = () => NoteModel.find({ userId });

// export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
//     'authentication.sessionToken': sessionToken,
// });

// export const getUserById = (id: String) => UserModel.findById(id);

// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

// export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);