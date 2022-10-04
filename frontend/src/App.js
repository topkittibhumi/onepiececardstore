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
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Lm9ptCdoX3fuSShN6jz5vvWHxXVRzLusojJA8HvfblxJz2Saeqe0uhit2HOJIWkqSyE4c6omzb1lObVe2dbORjO00NzpPu8q4');

function App() {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_3LnQN3CdoX3fuSSh1RsucSHl_secret_drZ30WOpqwpPxndBzO6C4BHtl',
  };
  return (
    <>
      <div className="container2" >
         <Elements stripe={stripePromise} options={options}>
        <ProductProvider>
        <CartProvider>
         <AppContainer/>     
        </CartProvider>
        </ProductProvider>
        </Elements>
        <ToastContainer enableMultiContainer containerId={'Main'} position={toast.POSITION.BOTTOM_LEFT} />
      </div>   
    </>
  )
}

export default App