import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string | undefined;
        console.log()
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== id) {
            return res.status(403).json({ "message": "Ownership mismatched" });
        };
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}