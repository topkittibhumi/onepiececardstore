import CartItem  from "./CartItem"
import { useState, useContext, useEffect, useRef} from 'react'
import './styles.css'
import CartContext from "../../contexts/CartContext"
import Close from './xmark.svg';
import React from "react";
import {CSSTransition} from 'react-transition-group';
import axios from "axios";
import { useNavigate } from "react-router";




export default function Cart() {
    
    const cart = useContext(CartContext)
    const navigate = useNavigate();
    console.log(cart.cart)
    function closeHandler(){
        cart.closeCart();
    }
    
    function checkOutHandler(){
        /*
        const config = {
            header: {
                "Content-Type" :"application/json"
            }
        }

 
        try {
            const {data} = await axios.post("http://localhost:5001/create-checkout-session", { cart.cart}, config);

            toast.success("We have sent you an email with instructions to reset your password.", {containerId: 'Main'})

        } catch(error){

            toast.error(error.response.data.message, {containerId: 'Forget'})
        }
        */
        navigate('/checkout')
    }
    

    return (<>
        
        <div className="shopping-cart-container" style={{visibility: cart.isOpen ?'visible':'hidden'}}>
            <div className="cart-title-container">
                <div className="cart-title">
                    Shopping Cart
                </div>
                <div className="cart-exit"  onClick={()=>closeHandler()}>
                    <img className="close-btn" src={Close} alt="" width="25px " />

                </div>
            </div>
            { cart.cart.map((element)=>(

                <CartItem  product_id ={element.id} seller_id={element.user_id} quantity={element.quantity} {...element} /> 
            )
            )}

            
            <div className="shopping-cart-total-container"> 
                Subtotal ({cart.cartQuantity} items): ${cart.totalPrice} AUD
            </div>
            <div className="shopping-cart-container-button">
                <button className="checkout-btn" > Proceed to Checkout  </button>
            </div>
              
        </div>  
   
    </>)
  }