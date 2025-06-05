import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './Config/database.js';
import userRoutes from './Routes/userRoutes.js';
import tweetRoutes from './Routes/tweetRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//env configuration
dotenv.config({
    path:'.env'
});
//connection
databaseConnection();
//create server
const app = express();
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000} `);
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});

