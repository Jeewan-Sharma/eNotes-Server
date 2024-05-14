import { Router } from 'express';

import authentication from './auth.router';
import users from './users.router';
import notes from './notes.router';

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    notes(router);
    return router;
};