import express from 'express';
import dotenv from 'dotenv';
import {dbConnect} from './config/db.js';
import router from './route/userRoute.js';
import adminRoute from './route/adminRoute.js'
import paymentRouter from './route/paymentRoute.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'

dotenv.config();

const app=express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
const PORT=9000; 
dbConnect();
app.use('/img',express.static('uploads'));
 app.use('/api',router);
 app.use('/api',adminRoute)
 app.use('/api/payment', paymentRouter)
app.listen(PORT,()=>{
    console.log("Server running..."); 
});