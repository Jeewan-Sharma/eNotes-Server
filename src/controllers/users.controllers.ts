import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../models';
import { authentication } from '../helpers';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json({ "message": "User Id not matched" });
        }
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { newUsername } = req.body;
        if (!newUsername) {
            return res.status(400).json({ "message": "new Username required" });
        }
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json({ "message": "User Id not matched" });
        }
        user.username = newUsername;
        await user.save();
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await deleteUserById(userId);
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    };
}

export const changePassword = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ "message": "Old and New Passwords are required" });
    }
    const user = await getUserById(userId).select('+authentication.salt +authentication.password');
    if (!user) {
        return res.status(400).json({ "message": "User is not registered" });
    }
    const expectedHash = authentication(user.authentication.salt, oldPassword);
    if (user.authentication.password !== expectedHash) {
        return res.status(403).json({ "message": "Old Password Incorrect" });
    }
    user.authentication.password = authentication(user.authentication.salt, newPassword);
    await user.save();
    return res.status(200).json(user).end();
}