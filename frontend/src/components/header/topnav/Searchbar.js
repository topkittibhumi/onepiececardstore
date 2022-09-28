import React, {useContext} from 'react'
import  ProductContext  from '../../../contexts/ProductContext'
import MagnifyingGlass from './icon/magnifying-glass.svg';
import './search_styles.css'
import ShowSearch from './ShowSearch';
export default function SearchBar() {
    console.log("Zzzzzzz")
    const state = useContext(ProductContext)
    console.log("Zzzzzzz2")
    const [categories] = state.state.categoriesAPI.categories
    console.log("Zzzzzzz3")
    const [category, setCategory] = state.state.productsAPI.category
    console.log("Zzzzzzz4")
    const [sort, setSort] = state.state.productsAPI.sort
    const [search, setSearch] = state.state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

  
  return (
    <>
        
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
        
                <input className="searchbar-container" type="text"  value={search} placeholder="Enter your search!"
                onChange={e => setSearch(e.target.value)} />
       
            <div className='search-btn-container'>
        
                <img src={MagnifyingGlass} alt="" width="25px " />
		
            </div>
            

    </>
  )
}

