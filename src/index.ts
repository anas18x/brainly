import express from 'express';
import { ErrorMiddleware } from './middlewares/index.js';
import _ from "./db.js"
import { ENV } from './config/ENV.config.js';
import cookieParser from "cookie-parser"
import rateLimit from 'express-rate-limit';
import APIRoutes from "./routes/index.js"
const app = express()


// Allow max 10 requests per 1 second per IP.
const limiter = rateLimit({
    windowMs : 1000,
    max: 10,
    message : "Too many requests from this IP, please try again after 1 sec"
})

app.use(express.json())
app.use(cookieParser())      // reads cookies from the request header and converts them into a JS object.
app.use(limiter)


app.use("api",APIRoutes)


app.use(ErrorMiddleware.errorMiddleware)
app.listen(ENV.PORT , ()=> console.log("running on port",ENV.PORT))
