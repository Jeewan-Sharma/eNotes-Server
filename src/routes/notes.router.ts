import { Router } from 'express';

import { getNotes, createNote } from '../controllers';
import { isAuthenticated } from '../middlewares'

export default (router: Router) => {
    router.post('/notes', isAuthenticated, createNote);
    router.get('/notes', isAuthenticated, getNotes);
    // router.get('/user/:id', isAuthenticated, getUser);
    // router.delete('/user/:id', isAuthenticated, deleteUser);
    // router.patch('/user/:id', isAuthenticated, updateUser);
    // router.patch('/user/change-password/:id', isAuthenticated, changePassword);
};