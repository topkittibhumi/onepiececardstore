import Navbar from "./nav/Navbar";
import TopNav from "./topnav/TopNav";
import SearchBar from "./topnav/Searchbar";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import Banner from "./banner/Banner";
export default function Header() {
//<Navbar/>
    return (
    <>
        <TopNav/>
    
        <Banner/>
      </>
    )
}
