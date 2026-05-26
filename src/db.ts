import mongoose from 'mongoose';
import { ENV } from './config/ENV.config.js';

export async function connectDB(){
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)     
        process.exit(1)
    }
}