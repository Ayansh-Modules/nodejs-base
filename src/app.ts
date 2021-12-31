import { config } from 'dotenv';
import express, { Application } from "express";
import { connectToMongoDB } from './configs/mongodbConfig';
import router from './routes';

config();
connectToMongoDB();

const app: Application = express();

app.use(express.json());

router(app);

export default app;