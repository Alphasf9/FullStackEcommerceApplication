import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected successfully ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`error while establishing connection ${error}`.bgRed.white)
    }
}

export  { connectDB }