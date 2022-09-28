import  { createContext , useState} from "react";

import { useEffect } from "react";


const CartContext = createContext();
export function CartProvider({ children }){

    const[cart, setCart] = useState([])
    const[cartQuantity, setCartQuantity] = useState(0);
    function updateCart(id, user_id,quantity){
        
        
        console.log("same no add")
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
            setCart(nextData)
        }

    }
    function updateQuantity(){
        let n = 0 ;
        cart.map((element)=>{
            n += parseInt(element.quantity)
        })
        setCartQuantity(n);
    }
    useEffect(()=>{
        console.log(JSON.stringify(cart))
       localStorage.setItem("cart",JSON.stringify(cart))
       updateQuantity()
    }, [cart])

    return (
      <CartContext.Provider value={{ cart, updateCart,cartQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };

export default CartContext
