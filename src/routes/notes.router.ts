import { Router } from 'express';

import { getNotes, createNote, updateNote, deleteNote } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.post('/notes', isAuthenticated, createNote);
    router.get('/notes/:userId', isAuthenticated, isOwner, getNotes);
    router.patch('/note/:noteId', isAuthenticated, updateNote);
    router.delete('/note/:noteId', isAuthenticated, deleteNote);
};