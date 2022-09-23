import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"
import { BiCartAlt, BiUser } from 'react-icons/bi';
import Menu from './icon/bars.svg';
import Cart from './icon/cart.svg';
import Close from './icon/xmark.svg';
import User from './icon/user.svg';
import MagnifyingGlass from './icon/magnifying-glass.svg';

export default function SearchBar() {
  return (
    <div class="search-container">

        <div class="logo"> 
            <hi>
                <Link to="/">One Piece Card Store</Link> 
            </hi>
        </div>
        <div className="search-bar">

            <form className='search-form'>
							<input
								className="search-in"
								type='search'
								placeholder='Search. . .'
								name='search'
							/>
							<button
								className='search-btn'
								type='submit'
							>
                        <img src={MagnifyingGlass} alt="" width="25px " />

						</button>
			</form>


        </div> 
        <div className="right-icon">
            <div className="cart-icon-container">
                <span>0</span>
                <Link className="cart-container">
                    <div >
                        <img src={Cart} alt="" width="35s " />

                    </div>
                    <div className="cart-text">
                        Cart
                    </div>
                </Link>
        
            </div>
            <div className="user-icon-container">
                <Link className="account-container">
                    <div>
                    <img src={User} alt="" width="30" />
                    </div>
                    <div className="account-text">
                        Account
                      </div>

                </Link>
        
            </div>
        </div>
    </div>
  )
}

