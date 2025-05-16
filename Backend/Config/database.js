import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {DB_NAME} from '../Constants/constant.js';
dotenv.config({
    path: '../Config/.env'
});

const databaseConnection = async () => {
    try {
        
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`).then(() => {
            console.log('Database connected successfully');
        }).catch((error) => {
            console.log('Database connection failed');
        })

    } catch (error) {
        console.log('Database connection failed');
    }
}

export default databaseConnection;
