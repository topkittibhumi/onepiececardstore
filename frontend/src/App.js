import Header from "./components/header/Header";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import GradedCard from "./pages/GradedCard";
import ProductDetail from "./pages/ProductDetail"
import Sell from "./pages/Sell";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProductProvider } from './contexts/ProductContext'
import "./styles.css"


function App() {

  
  return (
    <>
      <div className="container2">
        <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SingleCard />} />
          <Route path="/graded" element={<GradedCard />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/account" element={<Account />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
        </Routes>
        </ProductProvider>
        <ToastContainer enableMultiContainer containerId={'Main'} position={toast.POSITION.BOTTOM_LEFT} />
      </div>   
    </>
  )
}

export default App