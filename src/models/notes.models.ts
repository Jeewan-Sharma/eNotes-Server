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

export const GetImportantNotes = (id: string) => NoteModel.find({ userId: id, isImportant: true });

export const GetTagsByUserId = (userId: string) => NoteModel.aggregate([
    { $match: { userId } },  // Filter notes by userId
    { $unwind: "$tags" },    // Unwind the tags array
    { $group: { _id: "$tags" } },  // Group by tags to get unique tags
    { $sort: { "_id": 1 } }, // Sort the unique tags in ascending order
    { $group: { _id: null, uniqueTags: { $push: "$_id" } } } // Push the sorted tags into an array
]).then(result => result[0]?.uniqueTags || []);


export const GetNotesByTag = (id: string, tag: string) => NoteModel.find({ userId: id, tags: { $in: tag } });


export const SearchNotes = (userId: string, keyword: string) => {
    const regex = new RegExp(keyword, 'i'); // Case-insensitive regex pattern

    return NoteModel.find({
        userId,
        $or: [
            { title: { $regex: regex } }, // Match keyword in title
            { description: { $regex: regex } } // Match keyword in description
        ]
    });
};