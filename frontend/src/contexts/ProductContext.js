import  { createContext , useEffect, useState} from "react";
import axios from 'axios'
import ProductsAPI from "../api/ProductsAPI";
import CategoriesAPI from "../api/CategoriesAPI";
import { useParams } from "react-router";

const ProductContext = createContext();

export function ProductProvider({ children }){
    const [popularCard, setPopularCard] = useState([]);

    
    useEffect(() =>{
            console.log("PLEASE NO SEE")
            const getPopularCard = async () =>{
                const res = await axios.get('/api/products/popular/card?')
                setPopularCard(res.data.products)
            }
            getPopularCard()
    },[])

    const state = {
        productsAPI : ProductsAPI(),
        categoriesAPI: CategoriesAPI()
    }

    return (
      <ProductContext.Provider value={{popularCard, state }}>
        {children}
      </ProductContext.Provider>
    );


  };

export default ProductContext

