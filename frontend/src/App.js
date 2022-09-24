import Header from "./components/header/Header";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import GradedCard from "./pages/GradedCard";
import Sell from "./pages/Sell";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './contexts/UserContext'



function App() {

  
  return (
    <>
      <div className="container">
        <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SingleCard />} />
          <Route path="/graded" element={<GradedCard />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/account" element={<Account />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        </UserProvider>
        <ToastContainer enableMultiContainer containerId={'Main'} position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </>
  )
}

export default App