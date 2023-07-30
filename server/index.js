
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

const Port = 3001;

app.use('/user/', authRoutes);
app.use('/posts/', postRoutes);

app.get('/',(req, res) => {
    res.send("Working")
})

/* MONGOOSE SETUP */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(Port, () => {
        console.log(`Server is listening at http://localhost:${Port}`)
    })
})
.catch((error) => console.log(`${error} did not connect`));