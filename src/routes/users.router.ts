import { Router } from 'express';

import { changePassword, deleteUser, getAllUsers, getUser, updateUser } from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/:userId', isAuthenticated, getUser);
    router.delete('/user/:userId', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:userId', isAuthenticated, isOwner, updateUser);
    router.patch('/user/change-password/:userId', isAuthenticated, isOwner, changePassword);
};