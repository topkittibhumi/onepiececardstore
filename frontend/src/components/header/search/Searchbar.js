import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"
import { BiCartAlt, BiUser } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <div class="search-container">
        <div class="logo"> One Piece Card Store</div>
        <div className="search-bar">

            <div id="select">
                All categories
                <ul>
                    <li class="option">All categories</li>
                    <li class="option">Single card</li>
                    <li class="option">Graded card</li>
                </ul>
            </div>

        <input className="search" placeholder="Search..." />
        </div> 
        <div className="cart-icon-container">
              <BiCartAlt />
        </div>
        <div className="user-icon-container">
               <BiUser />
        </div>
    </div>
  )
}