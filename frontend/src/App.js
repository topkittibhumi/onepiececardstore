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
import AppContainer from "./AppContainer";
function App() {
  return (
    <>
      <div className="container2" >
      
        <ProductProvider>
        <CartProvider>
         <AppContainer/>     
        </CartProvider>
        </ProductProvider>
   
        <ToastContainer enableMultiContainer containerId={'Main'} position={toast.POSITION.BOTTOM_LEFT} />
      </div>   
    </>
  )
}

export default App