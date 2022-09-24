import { useNavigate } from "react-router"
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

function UserMenu (){
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate()

    const onLogout = () =>{
        console.log("hihi")
        localStorage.clear()
        setUser("","", false)
        navigate('/');
        window.location.reload(false);
        console.log("bye")
    }
    const onLogout2 = () => {
        console.log("kuy")
    }
    
    return (<>
    <div class="dropdown-content">
    <a href="#">Order</a>
    <Link to="/account">Account</Link>
    <a onClick={onLogout}> Logout </a>
  </div>
  </>
    )
 }

 export default UserMenu;