import express from 'express';
import Product from '../models/productModel.js';
import { getPopularCard ,getProductSearch,getProduct,getProductSellerInfo, getCartTotal} from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.get('/', async(req,res) =>{
    const products = await Product.find({});
    res.send({ products});
});
productRouter.get('/slug/:slug', async(req,res)=>{
    const product= await Product.findOne({slug:req.params.slug});
    if (product){
        res.send(product);
    } else{
        res.status(404).send({message: 'Product Not Found!'});
    }
});


productRouter.get('/popular/card', getPopularCard)
productRouter.get('/products', getProductSearch)
productRouter.get('/product',getProduct)
productRouter.get('/product/user',getProductSellerInfo)
productRouter.post('/price', getCartTotal)
export default productRouter;
