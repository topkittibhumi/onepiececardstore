import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';



export default function LoginFeature() {
    const [state, setState] = useState(1);


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
                setPassword("");
                setConfirmPassword("");
                setTimeout(() =>{
                    setError("");
                }, 5000);
                return setError("Passwords do not match");
            }
        
            try {
                const {data} = await axios.post("/api/users/regiser", { name, surname, email, password}, config);
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
    

          <button type="submit" className="btn btn-primary"> Register </button>
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
    
    switch(state){
        case 1:
            return (<> <LoginForm/> </>)
        case 2:
            return (<> <RegisterForm/> </>)
        case 3:
            return ( <> <ForgetForm/> </>)
    }
    return (<> <LoginForm/> </>)



}



