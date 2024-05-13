import { Request, Response, NextFunction } from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../models';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['eNotes-cookie'];
        if (!sessionToken) {
            return res.status(403).json({ "message": "User not logged In" })
        };
        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.status(403).json({ "message": "Token mismatched" });
        };
        merge(req, { identity: existingUser });
        return next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}
