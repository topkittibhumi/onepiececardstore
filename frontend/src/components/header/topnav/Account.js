import { Link, useMatch, useResolvedPath } from "react-router-dom"


import User from './icon/user.svg';
import {useEffect, useState, useRef, useContext} from 'react';
import LoginFeature  from "../../../features/login/LoginFeature"
import UserMenu  from "../../../features/login/UserMenu.js"

import {useNavigate} from 'react-router-dom'



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
export default function Account() {


    const [name, setName] = useState(JSON.parse(localStorage.getItem('name')))
    const [active, setActive] = useState(JSON.parse(localStorage.getItem('status')))
    
    const navigate = useNavigate()
    const [state, setState ] = useState(false)
    const [count, setCount] = useState(0)
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


  
  return (
    <>
    {state &&  <div ref={domNode} >{ active ? <UserMenu/>: <LoginFeature/>} </div>}
    
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
  
    </>
  )
}

