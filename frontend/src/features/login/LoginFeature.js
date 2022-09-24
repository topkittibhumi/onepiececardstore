import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserMenu from "./UserMenu";
import UserContext from '../../contexts/UserContext'

export default function LoginFeature() {
    const [state, setState] = useState(1);
    const { name } = useContext(UserContext);
    const { surname } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const { status} = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("hi fromsub")
    })
    function RegisterForm(){

        

        const [name, setName ] = useState("");
        const [surname, setSurname ] = useState("");
        const [email, setEmail ] = useState("");
        const [password, setPassword ] = useState("");
        const [confirmpassword, setConfirmPassword ] = useState("");
        const [error, setError] = useState("");
        

        

        const gotoLoginHandler = async (e) => {
            e.preventDefault();
            setState(1);
        }
        
        const registerHandler = async (e) => {
            e.preventDefault();
        
            const config = {
                header: {
                    "Content-Type" :"application/json"
                }
            }
            if (password !== confirmpassword){
                toast.error('Passwords do not match', {containerId: 'Register'})
                
            } else {
                try {

                    const {data} = await axios.post("/api/users/register", { name, surname, email, password}, config);
                    localStorage.setItem("authToken",JSON.stringify( data.token));
                    localStorage.setItem("status", JSON.stringify(true));
                    localStorage.setItem("name", JSON.stringify(data.name))
                    localStorage.setItem("id", JSON.stringify(data._id))
                    localStorage.setItem("surname",JSON.stringify( data.surname))
                    setUser(data.name, data.surname , true);
                    navigate('/account')

                    toast.success("Welcome "+ data.name, {containerId: 'Main'})
                    setState(4)

                } catch(error){
                    console.log("hi")
                    console.log(error)
                    toast.error(error.response.data.message, {containerId: 'Register'})
                }
                
            }
        

        }
    
      return (
        <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen-form">
            <h3 className="register-screen-title"> Register</h3> 
            {error && <span className="error-message"> {error}</span>}
            <div className="form-group">
            <label htmlFor="name"> Name </label>
            <input type="text" required id="name" placeholder="Enter name"
            value = {name} onChange={(e) => setName(e.target.value)}/>
        
            </div>
    
    
            <div className="form-group">
                <label htmlFor="surname"> Surname </label>
                <input type="text" required id="surname" placeholder="Enter surname"
                value = {surname} onChange={(e) => setSurname(e.target.value)}/>
            </div>
    
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input type="text" required id="email" placeholder="Enter email"
            value = {email} onChange={(e) => setEmail(e.target.value)}/>
        
          </div>
    
          <div className="form-group">
            <label htmlFor="password"> Password </label>
            <input type="text" required id="password" placeholder="Enter password"
            value = {password} onChange={(e) => setPassword(e.target.value)}/>
        
          </div>
    
          <div className="form-group">
            <label htmlFor="confirmpassword"> Confirm Password </label>
            <input type="text" required id="confirmpassword" placeholder="Confirm password"
            value = {confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        
          </div>
    
          <button type="submit" className="btn btn-primary"> Register </button>
          <span className="register-subtext"> Already have an account? <div className="goto-login" onClick={gotoLoginHandler}>Login</div></span>
    
        </form>
      </div>
        )
    }

    function LoginForm(){
        const [email, setEmail ] = useState("");
        const [password, setPassword ] = useState("");
        const [error, setError] = useState("");
        
        const gotoRegisterHandler = async (e) => {
            e.preventDefault();
            setState(2);
        }
        const gotoForgetPasswordHandler = async (e) => {
            e.preventDefault();
            setState(3);
        }


        const loginHandler = async (e) => {
            e.preventDefault();
            
            const config = {
                header: {
                    "Content-Type" :"application/json"
                }
            }



            try {
                const {data} = await axios.post("/api/users/login", {  email, password}, config);
                localStorage.setItem("authToken",JSON.stringify( data.token));
                localStorage.setItem("status", JSON.stringify(true));
                localStorage.setItem("id", JSON.stringify(data._id))
                localStorage.setItem("name", JSON.stringify(data.name))
                localStorage.setItem("surname",JSON.stringify( data.surname))
                //window.location.reload(false);
                navigate('/account')
                toast.success("Welcome "+ data.name, {containerId: 'Main'})

            } catch(error){
                toast.error(error.response.data.message, {containerId: 'Login'})

            }
        }
    
      return (
        <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen-form">
            <h3 className="login-screen-title"> Login</h3> 
            {error && <span className="error-message"> {error}</span>}

    
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input type="text" required id="email" placeholder="Enter email"
            value = {email} onChange={(e) => setEmail(e.target.value)}/>
        
          </div>
    
          <div className="form-group">
            <label htmlFor="password"> Password </label>
            <input type="text" required id="password" placeholder="Enter password"
            value = {password} onChange={(e) => setPassword(e.target.value)}/>
        
          </div>
    

          <button type="submit" className="btn btn-primary"> Log in </button>
          <span className="register-subtext"> Don't have account? <div className="goto-register" onClick={gotoRegisterHandler}>Register</div></span>
          <span className="forget-subtext"> Lost password? <div className="goto-forget" onClick={gotoForgetPasswordHandler}>Recover password</div></span>
        </form>
      </div>
        )
    }

    
    function ForgetForm(){
        const [email, setEmail ] = useState("");
        const [error, setError] = useState("");
        
        const gotoLoginHandler = async (e) => {
            e.preventDefault();
            setState(1);
        }

        const forgetHandler = async (e) => {
            e.preventDefault();
        
            const config = {
                header: {
                    "Content-Type" :"application/json"
                }
            }

     
            try {
                const {data} = await axios.post("/api/users/forget", {  email}, config);
                localStorage.setItem("authToken", data.token);
                //history.push("/");
            } catch(error){
                setError(error.responses.data.error)
                setTimeout(() =>{
                    setError("");
                }, 5000);
            }
        }


      return (
       
        <div className="forget-screen">
        <form onSubmit={forgetHandler} className="forget-screen-form">
            <h3 className="forget-screen-title"> Forget password</h3> 
            {error && <span className="error-message"> {error}</span>}

    
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input type="text" required id="email" placeholder="Enter email"
            value = {email} onChange={(e) => setEmail(e.target.value)}/>
        
          </div>
    

          <button type="submit" className="btn btn-primary"> Recover </button>
          <span className="login-subtext"> Remember your account? <div className="goto-register" onClick={gotoLoginHandler}>Login</div></span>
        </form>
      </div>
        )
    }
    function Blank(){
        return (<></>);
    }

    switch(state){
        case 1:
            return (<>  
            <ToastContainer enableMultiContainer containerId={'Login'}  />
            <LoginForm/>
             </>)
        case 2:
            return (<> 
            <ToastContainer enableMultiContainer containerId={'Register'}  />
            <RegisterForm/> 
            </>)
        case 3:
            return ( <> 
            <ToastContainer enableMultiContainer containerId={'Forget'}  />
            <ForgetForm/> 
            </>)
        case 4:
            return (
                <><Blank/></>
            )
        
    }
    return (<> <LoginForm/> </>)



}



