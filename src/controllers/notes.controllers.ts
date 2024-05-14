import { Request, Response } from 'express';
import { get } from 'lodash';

import { CreateNotes, GetNotes } from '../models/';

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
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        const notes = await GetNotes();
        return res.status(200).json(notes).end();
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}
