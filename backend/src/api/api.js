import cors from 'cors';
import express from 'express';
import UserRoutes from '../routes/Users.routes.js';

const app = express();

app.use(cors({
    origin:true, 
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserRoutes);
export default app;