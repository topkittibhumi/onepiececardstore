import { useState, useEffect, useContext } from 'react'
import { useParams, Link} from 'react-router-dom'
import CartContext from '../../contexts/CartContext'
import './cart_item_styles.css'
import axios from 'axios'
export default function CartItem( {product_id, seller_id}) {
    const pid = product_id;
    const sid = seller_id;
    console.log(pid);
    console.log(sid);
    const params = useParams()

    const cart = useContext(CartContext)
    const  [quantitySelection, setQuantitySelection] = useState([])
    const [selected, setSelected] = useState(1);
    const [product, setProduct] = useState([]);
    const [state, setState] = useState(false);
    useEffect(()=>{
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }
        const fetchProduct = async () =>{
            try {

                const id = params.id
    
                const data = await axios.get("http://localhost:5001/api/products/product/user?user="+sid +"&product="+pid, config);
    
                setProduct(data.data.data)
               console.log("hhhherererre")
                console.log(data)

                let n = []
                for (let i = 0; i < data.data.data[0].sellers.stock; i++){
                    n.push( i+1)
                }
                console.log(quantitySelection)
                setQuantitySelection(n)
                setState(true)
            } catch(error){
    
                console.log("error occur");
            }
        }
        fetchProduct()


    },[params.id])

    return (<>
        {state ?     
        <div className="cart-item-container">
            <div className="item-image">
                 <img src={product[0].image}  height="200px"/>
            </div>
            <div className="cart-item-title">
                {product[0].name} 
            </div>
            <div className='cart-item-seller'>
              {product[0].seller_info[0].store}
            </div>
            <div className="cart-item-quantity">
                Qty 
                <select className='quantity-option' value={selected}  onChange={(e)=>setSelected(e.target.value)} >
                                {  quantitySelection.map((element)=>(
                                    <option > {element}</option>
                                )) }
                 </select>
                
            </div>
            <div className="cart-item-price">
                ${product[0].sellers.price}
            </div>
        </div>
        : "Loading"}
    </>)
  }