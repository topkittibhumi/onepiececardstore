import  { createContext , useEffect, useState} from "react";
import axios from 'axios'
import ProductsAPI from "../api/ProductsAPI";
import CategoriesAPI from "../api/CategoriesAPI";
import { useParams } from "react-router";

const ProductContext = createContext();

export function ProductProvider({ children }){
    const [popularCard, setPopularCard] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);
    
    useEffect(() =>{
            console.log("PLEASE NO SEE")
            const getPopularCard = async () =>{
                const res = await axios.get('/api/products/popular/card?')
                setPopularCard(res.data.products)
            }
            const getTrendingProduct = async () =>{
              const res = await axios.get('/api/products/trending')
              setTrendingProduct(res.data.products)
          }
            getPopularCard()
            getTrendingProduct()
    },[])

    const state = {
        productsAPI : ProductsAPI()
    }

    return (
      <ProductContext.Provider value={{popularCard, trendingProduct ,state }}>
        {children}
      </ProductContext.Provider>
    );


  };

export default ProductContext

