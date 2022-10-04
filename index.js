import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import Sib from 'sib-api-v3-sdk';
import path from 'path';
const app = express();
dotenv.config();



import  Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

app.use('/posts', postRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// https://www.mongodb/cloud/atlas

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT,()=> console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

    


app.use('/api/seed', seedRouter);
app.get('/api/products', (req,res)=>{


});
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
   }
