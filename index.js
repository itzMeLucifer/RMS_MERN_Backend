import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser' 
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import fileupload from 'express-fileupload'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import issueRoutes from './routes/issueRoutes.js'
import requestRouter from './routes/requestRoutes.js'

const app = express();

app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors({
    origin:"https://rmsmern.netlify.app/"
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));
app.use(fileupload({ useTempFiles:true}))

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    return next();
})


app.use('/api',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/issues',issueRoutes)
app.use('/api/requests',requestRouter)

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Demo',})
    .then(()=> app.listen(PORT, ()=> console.log(`Server Running on PORT : ${PORT}`)))
    .catch((error) => console.log(error.message));
