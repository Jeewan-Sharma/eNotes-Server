import { Request, Response } from 'express';
import { get } from 'lodash';

import { CreateNotes, DeleteNoteById, GetImportantNotes, GetNoteById, GetNotes, GetNotesByTag, GetTagsByUserId, SearchNotes } from '../models/';

export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, description, tags } = req.body;
        if (!title || !description) {
            return res.status(400).json({ "message": "Incomplete Information" })
        }
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        const note = await CreateNotes({
            title: title,
            description: description,
            tags: tags,
            userId: currentUserId
        });
        return res.status(200).json(note).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export const getNotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notes = await GetNotes(userId);
        return res.status(200).json(notes).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const { title, description, tags } = req.body;
        if (!title || !description) {
            return res.status(400).json({ "message": "Incomplete Information" })
        }
        const note = await GetNoteById(noteId);
        if (!note) {
            return res.status(400).json({ "message": "Note Id not matched" });
        }
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== note.userId) {
            return res.status(400).json({ "message": "Ownership mismatch" })
        }
        note.title = title;
        note.description = description;
        note.tags = tags;
        note.modifiedDate = new Date();
        await note.save();
        return res.status(200).json(note).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}


export const setNoteImportance = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const { isImportant } = req.body;
        if (isImportant === undefined) {
            return res.status(400).json({ "message": "Incomplete Information" });
        }
        const note = await GetNoteById(noteId);
        if (!note) {
            return res.status(400).json({ "message": "Note Id not matched" });
        }
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== note.userId) {
            return res.status(400).json({ "message": "Ownership mismatch" })
        }
        note.isImportant = isImportant;
        await note.save();
        return res.status(200).json(note).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const note = await GetNoteById(noteId);
        if (!note) {
            return res.status(400).json({ "message": "Note Id not matched" });
        }
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== note.userId) {
            return res.status(400).json({ "message": "Ownership mismatch" })
        }
        const deletedNote = await DeleteNoteById(noteId);
        return res.status(200).json(deletedNote).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const getImportantNotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notes = await GetImportantNotes(userId);
        return res.status(200).json(notes).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export const getNotesTags = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const tags = await GetTagsByUserId(userId);
        return res.status(200).json(tags).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export const getNotesByTag = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { tag } = req.body;
        if (!tag) {
            return res.status(400).json({ "message": "Incomplete Information" })
        }
        const notes = await GetNotesByTag(userId, tag);
        return res.status(200).json(notes).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export const searchNotes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { keyword } = req.body;
        if (!keyword) {
            return res.status(400).json({ "message": "Incomplete Information" })
        }
        const notes = await SearchNotes(userId, keyword);
        return res.status(200).json(notes).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}