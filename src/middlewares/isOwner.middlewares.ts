import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const currentUserId = get(req, 'identity._id') as string | undefined;
        if (!currentUserId) {
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== userId) {
            return res.status(403).json({ "message": "Ownership mismatched" });
        };
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}