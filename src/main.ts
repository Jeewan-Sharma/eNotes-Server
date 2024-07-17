import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import router from './routes';

// Creating Application
const app = express();

// Using Middlewares
app.use(helmet());
// origin: 'http://localhost:4200',
app.use(cors({
    origin: /https:\/\/cushynotes\.vercel\.app(\/.*)?/,
    credentials: true,
}));
app.use(morgan("short"));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//config env file
dotenv.config();
const PORT = process.env.PORT || 9000;

// creating Server
const server: http.Server = http.createServer(app)

server.listen(PORT, () => {
    db_connect();
    console.log(`Server listening on port http://localhost:${PORT}`)
})

app.use('/', router())

const db_connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
        throw err;
    }
};