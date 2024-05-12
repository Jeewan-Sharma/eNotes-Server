import { Router } from 'express';

import authentication from './auth.router';

const router = Router();

export default (): Router => {
    authentication(router);
    return router;
};