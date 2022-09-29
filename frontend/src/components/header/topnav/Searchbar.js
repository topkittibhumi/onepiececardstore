import React, {useContext} from 'react'
import  ProductContext  from '../../../contexts/ProductContext'
import MagnifyingGlass from './icon/magnifying-glass.svg';
import './search_styles.css'
import ShowSearch from './ShowSearch';
export default function SearchBar() {
  
    
    const state = useContext(ProductContext)

    
    const [categories] = state.state.categoriesAPI.categories

    
    const [category, setCategory] = state.state.productsAPI.category
 
    
    const [sort, setSort] = state.state.productsAPI.sort
    const [search, setSearch] = state.state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

  /* cate code
     <div className="category-container">
                  <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Category</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
                  </div>
  */
  return (
    <>
        

        
                <input className="searchbar-container" type="text"  value={search} placeholder="Enter your search!"
                onChange={e => setSearch(e.target.value)} />
       
            <div className='search-btn-container'>
        
                <img src={MagnifyingGlass} alt="" width="25px " />
		
            </div>
            

    </>
  )
}

