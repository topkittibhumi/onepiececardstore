import { useNavigate } from "react-router"
import { useContext } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import ProductContext from '../../../contexts/ProductContext'
import './show_styles.css'
function ShowSearch (){

    const state = useContext(ProductContext)
    const [products, setProducts] = state.state.productsAPI.products
    const [result, setResult] = state.state.productsAPI.result
    const navigate = useNavigate()
    const s = products[0];
    console.log("hello");
    console.log(products)
    function clickHandler (id){
        navigate('/product/'+id);
    }
    return (<>
    <div className="show-container">

    <  div className="search-product-container">
                {result==0 && <div className="all-result-no-match">  No match result</div>}

                {
                   products && products.slice(0,3).map(product => (
                    
                        <>
                        <div className="show-search-product-single" onClick={ () =>clickHandler(product._id)}>   
                            <div className="show-search-product-single-image-container">             
                                <img src={product.image}alt={product.name} height="100px"/>
                                </div>  
                            <div className="show-search-product-single-detail-container">
                            <ul>
                                <li>{product.name}</li>
                                
                               {product.sellers.length >0 &&  <li> {"$"+product.cheapest_seller.price} from {product.cheapest_seller.user.store}</li> }
                                <li>{product.sellers.length >0 ? product.cheapest_seller.stock+ " in stock" : "Out of stock"} </li>

                            </ul>
  
                            </div>
                        </div>
                        
                        </>
                    ))
                    
                }
                
                {result>3 && <div className="all-result-container">  View all {result} results  </div>}

            </div>

     
            </div>

  </>
    )
 }

 export default ShowSearch;
