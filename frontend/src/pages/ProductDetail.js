import Header from '../components/header/Header'
import data from '../data'
import PopularCard from '../features/popular/PopularCard'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from "axios";
import './product-styles.css'
import CartItem from '../features/cart/CartItem'
import CartContext from '../contexts/CartContext'
import Cart from '../features/cart/Cart'
import ProgressBar from '../components/progressbar/Progressbar'
export default function ProductDetail() {
    const params = useParams()
    const [product,setProduct] = useState([])
    const [state,setState] = useState(false)
    const cart = useContext(CartContext)
    const  [quantitySelection, setQuantitySelection] = useState([])
    const [selected, setSelected] = useState(1);

    function handleChange (value)  {

        setSelected(value);
      };
    useEffect(()=>{
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }
        const fetchProduct = async () =>{
            try {

                const id = params.id
    
                const data = await axios.get("/api/products/product?id="+params.id , config);
    
                setProduct(data.data.data)
               
              
                
                let n = []
                for (let i = 0; i < data.data.data[0].cheapest_seller.stock; i++){
                    n.push( i+1)
                }
               
                
                setQuantitySelection(n)
                setState(true)
            } catch(error){
    
                console.log("error occur");
            }
        }
        fetchProduct()


    },[params.id])

    

    function addToCart(id, user_id){
        console.log(selected)
        cart.updateCart(id,user_id,selected)
        cart.openCart()
    }
    

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
                              
                            <select className='quantity-option' value={selected}  onChange={(e)=>setSelected(e.target.value)} >
                                {  quantitySelection.map((element)=>(
                                    <option > {element}</option>
                                )) }
                            </select>
                            
                            </div>
    
                            
                            <div className='stock-amount'>
                                of  {product[0].cheapest_seller.stock}
                            </div>
                        </div>
                        <div className='cart-btn'>
                            <button onClick={ ()=>addToCart( product[0]._id , product[0].cheapest_seller.user._id)}> Add to cart</button>
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
    
    

    
    : <> <ProgressBar /> </>}


    </>)
  }

  //        <CartItem  product_id ={product[0]._id} seller_id={product[0].cheapest_seller.user._id}/>
