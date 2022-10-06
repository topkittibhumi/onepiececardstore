
import data from '../../data'
import './styles.css'
import { useEffect , useContext, useState } from 'react'
import { useNavigate } from "react-router"
import ProductContext from '../../contexts/ProductContext'
export default function SingleCard() {
   
    const navigate = useNavigate()
    const state = useContext(ProductContext)
    const popular_card = state.popularCard
    console.log("popu")
    console.log(popular_card)
    function cardClickHandler (id){
        navigate('/product/'+id);
    }
    return (<>
        <h2>Popular card</h2>
        <div className='popular-container'>

        { popular_card.map(product =>(
        
        <div className='popular-product-single' onClick={()=>cardClickHandler(product._id)}  >
        <div className='popular-product-single-image-container'>

        <img src={product.image} alt={product.name} height="200px"/>
        </div>
        <div className='popular-product-single-detail-container'>
            <div className='popular-name'>

                <p >{product.name}</p>
            </div>
            <div className='popular-price'>
                <p>{ product.cheapest_seller.price <999999? "$"+product.cheapest_seller.price : "Not available"}</p>
            </div>
        </div>
        </div>
))}
        </div>
        
    </>)
  }