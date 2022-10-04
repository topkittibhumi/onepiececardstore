import Header from "./components/header/Header";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import GradedCard from "./pages/GradedCard";
import ProductDetail from "./pages/ProductDetail"
import Sell from "./pages/Sell";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from 'react';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProductProvider } from './contexts/ProductContext'
import CartContext, { CartProvider } from "./contexts/CartContext";
import "./styles.css"
import Checkout from "./pages/Checkout";
function AppContainer() {
  const cart = useContext(CartContext);
  
  return (
    <>
       <div style={{ pointerEvents: cart.isOpen ? 'none': 'auto' }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SingleCard />} />
          <Route path="/graded" element={<GradedCard />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/account" element={<Account />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/checkout" element={<Checkout />}/>
        </Routes>
     
    </div>
    </>
  )
}

export default AppContainer