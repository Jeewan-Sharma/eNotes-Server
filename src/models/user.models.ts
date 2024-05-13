import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    authentication: {
        type: {
            password: { type: String, required: true, select: false },
            salt: { type: String, required: true, select: false },
            sessionToken: { type: String, select: false },
        },
        required: true,
    }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

export const getUserById = (id: String) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);