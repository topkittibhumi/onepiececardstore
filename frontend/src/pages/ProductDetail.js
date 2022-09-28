import Header from '../components/header/Header'
import data from '../data'
import PopularCard from '../features/popular/PopularCard'
import { useState, useEffect } from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from "axios";
import './product-styles.css'
export default function ProductDetail() {
    const params = useParams()
    const [product,setProduct] = useState([])
    const [state,setState] = useState(false)
    useEffect(()=>{
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }
        const fetchProduct = async () =>{
            try {

                const id = params.id
    
                const data = await axios.get("http://localhost:5001/api/products/product?id="+params.id , config);
    
                setProduct(data.data.data)
                setState(true)
                console.log(data)
            } catch(error){
    
                console.log("error occur");
            }
        }
        fetchProduct()
        console.log("here")
        console.log(product)

    },[params.id])
    console.log(product)
    console.log("done")

    return (<>
    <Header />
    {state ?     
    <div className='item-container'>

  
        <div className='item-top-container'>
       
        <div className='item-left-container'>
             <img src={product[0].image} alt={product[0].name} height="200px"/>
        </div>
        <div className='item-right-container'>
            <h1  > {product[0].name}</h1>
            {product[0].sellers.length >0 

                ? 
                <div className='price-container'>
                    <span className="item-price"> ${product[0].cheapest_seller.price} </span>
                    <span className="item-seller"> Sold by  <span className="sold-by-seller">{product[0].cheapest_seller.user.store}</span> </span>
                    <div className='stock-price-row'>
                        <div className='stock-row'>
                            <div className='order-amount'>
                            1
                            </div>
    
                            
                            <div className='stock-amount'>
                                of  {product[0].cheapest_seller.stock}
                            </div>
                        </div>
                        <div className='cart-btn'>
                            <button> Add to cart</button>
                        </div>
                    </div>

                </div> 
                :
                <div className='outofstock-container'>
                    <span className="outofstock-text">  This item is currently not available  </span>
                    <button className='request-btn'> Request </button>
                </div>
             }

            <div className='product-detail-container'>
                    <div className='product-detail-title'>
                    Product Details

                    </div>
                    <div className='product-detail-info'>

                    
If this card is Normal or Special Summoned: You can add 1 "Labrynth" card from your Deck to your hand, except "Arianna the Labrynth Servant". If another monster(s) leaves the field by your Normal Trap effect (except during the Damage Step): You can draw 1 card, then you can apply this effect.
• From your hand, either Special Summon 1 Fiend monster, or Set 1 Spell/Trap.
You can only use 1 "Arianna the Labrynth Servant" effect per turn, and only once that turn.
                    </div>

                </div>
            </div>
            
            
        </div> 
        
        <div className='item-bottom-container'>

        </div>
    </div>
    : <h1> Loading </h1>}


    </>)
  }