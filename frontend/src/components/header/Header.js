import Navbar from "./nav/Navbar";
import TopNav from "./topnav/TopNav";
import SearchBar from "./topnav/Searchbar";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
export default function Header() {

    return (
    <>

        <TopNav/>
        <Navbar/>
      </>
    )
}
