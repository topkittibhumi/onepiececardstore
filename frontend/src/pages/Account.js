import Header from '../components/header/Header'
import {useNavigate  } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




export default function Account() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if(flag){
            console.log("fwefewfwefwef")
            navigate('/login')
        }
      }, [flag]);

    const getData = async (e) => {
        console.log('call')
        console.log('call2')
        const token = JSON.parse(localStorage.getItem('authToken'))
        const id = JSON.parse(localStorage.getItem('id'))
        console.log(token)
        console.log('call3')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" :"application/json"
            }
        }

        console.log('sjurvive?')
        try {
            console.log(config)
            const {data} = await axios.get('http://localhost:5001/api/users/me',  config);
            console.log("heheg")
            setName(data.name)
            console.log(data)
        }  catch(error){
            console.log("error")
            console.log(error.response.data.message)
            localStorage.clear()
            //toast.error("Session timeout, Please login again.", {containerId: 'Main'})

            setFlag(true)
        }
    }
    console.log("hi")
    getData()
    console.log("hi2")

    return (<><Header /><h1> {name}  Account</h1></>)
  }