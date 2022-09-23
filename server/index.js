import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import Sib from 'sib-api-v3-sdk';
const app = express();
dotenv.config();

app.use('/posts', postRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// https://www.mongodb/cloud/atlas

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT,()=> console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

app.use('/api/seed', seedRouter);
app.get('/api/products', (req,res)=>{

});
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
