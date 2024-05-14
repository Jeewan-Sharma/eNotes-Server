import { Request, Response } from 'express';
import { getUserByEmail, createUser } from '../models/';
import { authentication, random } from '../helpers';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "message": "Email or Password is required" });
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).json({ "message": "User is not registered" });
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ "message": "Wrong Password!, Try again with new Password" });
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save()
        res.cookie('eNotes-cookie', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    };
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ "message": "username, email and password is required" }).end();
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ "message": "Duplicate email inserted" }).end();
        }
        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
};