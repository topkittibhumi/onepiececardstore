import React, {useContext,useEffect, useState, useRef} from 'react'
import  ProductContext  from '../../../contexts/ProductContext'
import MagnifyingGlass from './icon/magnifying-glass.svg';
import './search_styles.css'
import { useNavigate,useParams } from "react-router"



const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick, true);
  
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);
  
    return ref;
  };

export default function SearchBar() {
  
    
    const state = useContext(ProductContext)
    const [search, setSearch] = state.state.productsAPI.search
    const [state2, setState2 ] = useState(false)
    const params = useParams()

    const [products, setProducts] = state.state.productsAPI.products
    const [result, setResult] = state.state.productsAPI.result
    const navigate = useNavigate()
    const s = products[0];

    console.log("state")
    console.log(state2)
    function clickHandler (id){
        setState2(false);

        navigate('/product/'+id);
    }



    const searchClickHandler = async (e) => {
        e.preventDefault();
        setState2(true);
 
    }
    const handleClickOutside = () => {
        setState2(false);
      };
    
    const ref = useOutsideClick(handleClickOutside);

    useEffect(() =>{
        setState2(false)
    },[params.id])

  return (
    <>
         <div id="search-feature-container"  ref={ref} >  
 
            <div className='searchbar-container' >
                <div className='search-field' onClick={searchClickHandler}>
                    <input  type="text"  value={search} placeholder="Enter your search!"
                    onChange={e => setSearch(e.target.value)} />
       
                </div>
                <div className='search-btn-container'>
        
                    <img src={MagnifyingGlass} alt="" width="25px " />
                </div>
            </div>
        {state2 &&  

            <div className="show-container" >
                    
            <div className="search-product-container"  >
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
                            
                           {product.sellers.length >0 &&  <li> {"$"+product.cheapest_seller.price} </li> }
                           {product.sellers.length >0 && <li>Seller: {product.cheapest_seller.user.store}</li>}
                            <li>{product.sellers.length >0 ? product.cheapest_seller.stock+ " in stock" : "Out of stock"} </li>


                        </ul>

                        </div>
                    </div>
                    
                    
                    </>
                ))
                
            }
            
            {result>3 && <div className="all-result-container">  View all {result} results  </div>}

        </div>

 
 
        

        </div>}
        </div>
    </>
  )
}

