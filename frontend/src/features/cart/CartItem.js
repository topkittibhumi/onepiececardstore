import { useState, useEffect, useContext } from 'react'
import { useParams, Link} from 'react-router-dom'
import CartContext from '../../contexts/CartContext'
import './cart_item_styles.css'
import axios from 'axios'
import ProgressBar from '../../components/progressbar/Progressbar'
export default function CartItem( {product_id, seller_id, quantity}) {

    const params = useParams()
    const cart = useContext(CartContext)
    const  [quantitySelection, setQuantitySelection] = useState([])
    const [selected, setSelected] = useState(quantity);
    const [pid,setPid] = useState(product_id);
    const [sid,setSid] = useState(seller_id);
    const [product, setProduct] = useState([]);
    const [state, setState] = useState(false);
  
    

    useEffect(()=>{
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }
        const fetchProduct = async () =>{
            console.log("feeeettt")
            try {
     
                const id = params.id
    
                const data = await axios.get("/api/products/product/user?user="+sid +"&product="+pid, config);
    
                setProduct(data.data.data)


                let n = []
                for (let i = 0; i < data.data.data[0].sellers.stock; i++){
                    n.push( i+1)
                }
            
                setQuantitySelection(n)
                setState(true)
            } catch(error){
    
                ;
            }
        }
        fetchProduct()


    },[params.id])

    useEffect(()=>{
   
        console.log("selected change")
        cart.load()
        cart.updateCart(pid,sid,selected)
    },[selected])

    function removeHandler (){
        console.log("remove!!")

        setSelected(0)
        setState(false)
        
 
    }

    useEffect(()=>{
  
        setSelected(quantity)
   
    },[quantity])
    if(selected === 0){
        return(<></>)
    }

    console.log("item rerendered")
    return (<>
        {state ?     
        <div className="cart-item-container">
            <div className="item-image-container">
                 <img src={product[0].image}  height="150px"/>
            </div>
            <div className='cart-item-detail-container'>
                <div className="cart-item-title">
                    {product[0].name} 
                </div>
                <div className='cart-item-seller'>
                {product[0].seller_info[0].store}
                </div>
                <div className='cart-item-quantity-container'>
                    <div className="cart-item-quantity">
                        
                        <select className='quantity-option' value={selected}  onChange={(e)=>setSelected(e.target.value)} >
                                        {  quantitySelection.map((element)=>(
                                            <option > {element}</option>
                                        )) }
                        </select>
                        
                    </div>
                    <div className='cart-item-remove'>
                        <span onClick={()=> removeHandler()}> Remove</span>
                    </div>
                </div>
            </div>
            <div className="cart-item-price-container">
                ${product[0].sellers.price}
            </div>
        </div>
        : <><ProgressBar/></>}
    </>)
  }