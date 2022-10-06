import mongoose from 'mongoose';

const productSchema =  new mongoose.Schema(
    {
        name: { type:  String, required: true, unique: true},
        slug: { type:  String, required: true, unique: true},
        image: {type: String, required: true},
        brand: { type: String, required: true },
        category: { type: String, required: true},
        card_box: {type: String},
        description: {type: String},
        popular_card: {type: Number},
        popular_product: {type: Number},
        checked: {type: Boolean, default: false},
        sellers: [
            {
                user : { type: mongoose.Schema.Types.ObjectId,  ref: 'User'},
                price :{ type: Number, required: true},
                stock : { type: Number, required: true}
            }
        ],
        trending: {type: Number}
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;