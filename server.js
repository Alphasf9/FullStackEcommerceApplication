import express from 'express';
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import morgan from "morgan"
import colors from "colors"
import authRoutes from './routes/authRoute.js'
import cors from 'cors'

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes);


app.get("/", (req, res) => {
    res.send(`<h1> Welcome</h1>`)
})

app.listen(process.env.PORT || 8000, (req, res) => {
    console.log(`listening on ${process.env.PORT}`);
})

