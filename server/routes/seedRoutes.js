import express from 'express';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import data from '../data.js';
const seedRouter = express.Router();

seedRouter.get('/', async(req,res) =>{
    await Product.deleteMany({});;
    const createdProducts = await Product.insertMany(data.products);
    //const createdCategories= await Category.insertMany(data.categories);

    res.send({ createdProducts});
});


export default seedRouter;