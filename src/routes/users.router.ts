import { Router } from 'express';

import { changePassword, deleteUser, getAllUsers, getUser, updateUser } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/:id', isAuthenticated, getUser);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
    router.patch('/user/change-password/:id', isAuthenticated, isOwner, changePassword);
};