import { Router } from 'express';

import { register, login, logout } from '../controllers';

export default (router: Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/logout', logout);
} 