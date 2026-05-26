import express from 'express';
import { connectDB } from './db.js';
import { ENV } from './config/ENV.config.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import v1Routes from './routes/v1/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';


const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,      // 15 min
    limit : 100,                   // max 100 requests per windowMs
    message : 'Too many requests from this IP, please try again later.'
}) 


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(limiter);


app.use("/api/v1", v1Routes);

app.use(errorMiddleware);

(async () => {
    await connectDB()
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`)
    })
})()


