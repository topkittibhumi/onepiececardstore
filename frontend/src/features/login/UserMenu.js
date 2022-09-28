import { useNavigate } from "react-router"
import { useContext } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

function UserMenu (){


    const navigate = useNavigate()

    const onLogout = () =>{
        console.log("hihi")
        localStorage.clear()

        navigate('/');
        window.location.reload(false);
        console.log("bye")
    }
    const onLogout2 = () => {
        console.log("kuy")
    }
    
    return (<>
            <div className="login-container">
    <div class="dropdown-content">
    <a href="#">Order</a>
    <Link to="/account">Account</Link>
    <a onClick={onLogout}> Logout </a>
  </div>
  </div>
  </>
    )
 }

 export default UserMenu;