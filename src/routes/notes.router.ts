import { Router } from 'express';

import { getNotes, createNote, updateNote, deleteNote, setNoteImportance } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.post('/notes', isAuthenticated, createNote);
    router.get('/notes/:userId', isAuthenticated, isOwner, getNotes);
    router.patch('/note/:noteId', isAuthenticated, updateNote);
    router.patch('/note/set-importance/:noteId', isAuthenticated, setNoteImportance);
    router.delete('/note/:noteId', isAuthenticated, deleteNote);
};