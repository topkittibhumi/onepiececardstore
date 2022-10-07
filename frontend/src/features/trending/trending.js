
import { useEffect , useContext, useState } from 'react'
import { useNavigate } from "react-router"
import ProductContext from '../../contexts/ProductContext'
import './styles.css'
export default function Trending() {
   
    const navigate = useNavigate()
    const state = useContext(ProductContext)
    const trending_products = state.trendingProduct

    function cardClickHandler (id){
        navigate('/product/'+id);
    }
    return (<>
        <h2>Feature Products</h2>
        <div className='trending-container'>

        { trending_products.map(product =>(
        <div key={product._id}>
        <div className='trending-product-single' onClick={()=>cardClickHandler(product._id)}  >
        <div className='trending-product-single-image-container'>

        <img src={product.image} alt={product.name} height="200px"/>
        </div>
        <div className='trending-product-single-detail-container'>
            <div className='trending-name'>

                <p >{product.name}</p>
            </div>
            <div className='trending-price'>
                <p>{ product.cheapest_seller.price <999999? "$"+product.cheapest_seller.price : "Not available"}</p>
            </div>
        </div>
        </div>
        </div>
))}
        </div>
        
    </>)
  }