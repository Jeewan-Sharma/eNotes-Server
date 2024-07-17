import { Router } from 'express';

import { getNotes, createNote, updateNote, deleteNote, setNoteImportance, getImportantNotes, getNotesTags, getNotesByTag, searchNotes } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.get('/notes/:userId', isAuthenticated, isOwner, getNotes);
    router.get('/notes/important/:userId', isAuthenticated, isOwner, getImportantNotes);
    router.get('/notes/tags/:userId', isAuthenticated, isOwner, getNotesTags);
    router.post('/notes/notes-by-tag/:userId', isAuthenticated, isOwner, getNotesByTag);
    router.post('/notes/search/:userId', isAuthenticated, isOwner, searchNotes);
    router.post('/notes', isAuthenticated, createNote);
    router.put('/note/:noteId', isAuthenticated, updateNote);
    router.put('/note/set-importance/:noteId', isAuthenticated, setNoteImportance);
    router.delete('/note/:noteId', isAuthenticated, deleteNote);
};