import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"
import { BiCartAlt, BiUser } from 'react-icons/bi';
import Menu from './icon/bars.svg';
import Cart from './icon/cart.svg';
import User from './icon/user.svg';
import MagnifyingGlass from './icon/magnifying-glass.svg';
import {useEffect, useState, useRef, useContext} from 'react';
import LoginFeature  from "../../../features/login/LoginFeature"
import UserMenu  from "../../../features/login/UserMenu.js"
import SearchBar from "./Searchbar";

import {useNavigate, useParams} from 'react-router-dom'
import CartContext from "../../../contexts/CartContext"

let useClickOutside = (handler)=> {
    let domNode = useRef();

    useEffect(()=> {
        let maybeHandler = (event)=>{
            if (!domNode.current?.contains(event.target)){
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return () =>{
            document.removeEventListener("mousedown", maybeHandler);
        };
    });
    return domNode;

};


export default function TopNav() {


    const [name, setName] = useState(JSON.parse(localStorage.getItem('name')))
    const [active, setActive] = useState(JSON.parse(localStorage.getItem('status')))
    
    const navigate = useNavigate()
    const [state, setState ] = useState(false)
    const [count, setCount] = useState(0)
    const params = useParams()
    const cart = useContext(CartContext)

    const accountClickHandler = async (e) => {
        e.preventDefault();

  
            if (count<1){
                setState(!state);
                setCount(1);
            } else{
                setCount(0);
            }
 
    }

  

    let domNode = useClickOutside (()=>{
        if (state){
            setState(false);
            setCount(prevCount =>prevCount +1);    
        }
        setCount(prevCount =>prevCount -1);
    })

    

    function cartClickHandler(){
        cart.load();
        cart.openCart();
    }
    useEffect(()=>{
        ;
    },[cart.cart])


  return (
    <>
      {state &&  <div ref={domNode} >{ active ? <UserMenu/>: <LoginFeature/>} </div>}
    <div class="search-container">

        <div class="logo"> 
            <hi>
                <Link to="/">One Piece Card Store</Link> 
            </hi>
        </div>
        <div className="empty-container"></div>
        <div className="right-icon">
            <div className="cart-icon-container" onClick={()=> cartClickHandler()}>
                <span>{ cart.cartQuantity}</span>
                <Link className="cart-container">
                    <div >
                        <img src={Cart} alt="" width="35s " />

                    </div>
                    <div className="cart-text">
                        Cart
                    </div>
                </Link>
        
            </div>
            <div className="user-icon-container" onClick={accountClickHandler}  >
                <Link className="account-container">
                    <div>
                    <img src={User} alt="" width="30" />
                    </div>
                    <div className="account-text">
                        { active ? name : "Account" }
                      </div>

                </Link>
                
            </div>
        </div>
    </div>
    <SearchBar/>

    </>
  )
}

