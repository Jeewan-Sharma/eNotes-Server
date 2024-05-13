import { Router } from 'express';

import authentication from './auth.router';
import users from './users.router'

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    return router;
};