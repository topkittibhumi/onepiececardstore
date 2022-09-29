import  { createContext , useState} from "react";

import { useEffect } from "react";
import { BiSleepy } from "react-icons/bi";
import Cart from "../features/cart/Cart"
import axios from "axios";
const CartContext = createContext();
export function CartProvider({ children }){

    const[flag,setFlag] = useState(true)
    const[cart, setCart] = useState([])
    const[isOpen, setIsOpen] = useState(false)
    const[cartQuantity, setCartQuantity] = useState(0);
    const[totalPrice, setTotalPrice] = useState(0)
    function updateCart(id, user_id,quantity){
        
        
        let flag = false;
        const nextData = cart.map((element)=>{
            if (id === element.id && user_id === element.user_id){
                flag = true;
                return { "id": element.id , "user_id": element.user_id, "quantity": quantity};
            } else{
                return element;
            }
        })
        if(!flag){
            const data = {
                "id": id,
                "quantity": quantity,
                "user_id" : user_id
                }
            
            setCart( current=> [...current, data]);       
        } else{
            console.log("setCart ")
            setCart(nextData)
        }


        
    }

    
    function updateQuantity(){
        if (cart.length ==0 || cart == null || cart == undefined){
            setCartQuantity(0);
            return;
        }
        let n = 0 ;
        let p = 0 ;
        cart.map((element)=>{
            n += parseInt(element.quantity)
        
        })
        setCartQuantity(n);
    }
    function remove(pid,sid){
        console.log("yeeeeha")
        setCart(e => e.filter(element=>{
            return element.user_id !== sid && element.id !== pid;
        }))

    }
    function load(){
        if ( JSON.parse(localStorage.getItem("cart"))){
            setCart(JSON.parse(localStorage.getItem("cart")))
        }
    }
    function openCart(){
        console.log("opennnnnnn")
        setIsOpen(true)
    }
    function closeCart(){
        setIsOpen(false)
    }
    function refresh(){
        console.log("refresh")
        setIsOpen(false);
        setIsOpen(true)
    }
    useEffect(()=>{

        // First Render
        
        if(flag && JSON.parse(localStorage.getItem("cart"))){
            setCart(JSON.parse(localStorage.getItem("cart")))
            setFlag(false);
        } else{
        
            localStorage.setItem("cart",JSON.stringify(cart))
 
        }
        updateQuantity()
        updatePrice()

    }, [cart])
   
    function updatePrice(){
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }
        const getPrice = async () =>{
            try{
                const res = await axios.post('http://localhost:5001/api/products/price', { cart}, config);
                setTotalPrice(res.data.data)
            }
            catch{
                console.log("fail")
            }
        }
        getPrice();
    }


    return (
      <CartContext.Provider value={{ cart,updateQuantity,updateCart,cartQuantity,remove,totalPrice,load,openCart, refresh,closeCart ,isOpen}}>
              {isOpen ?<Cart/> :"" }

        {children}
      </CartContext.Provider>
    );
  };

export default CartContext
