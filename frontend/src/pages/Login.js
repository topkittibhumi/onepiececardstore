
import {useNavigate } from 'react-router-dom'
import {useEffect} from 'react'

export default function Login() {
    const navigate = useNavigate()
    console.log("hihihi")
    const status  = localStorage.getItem('status')
    useEffect(() => {
        if (status){
         navigate("/account")   
        }
    },[])



    return (<><h1>Login</h1></>)
  }