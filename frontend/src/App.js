import Header from "./components/header/Header";
import Home from "./pages/Home";
import SingleCard from "./pages/SingleCard";
import GradedCard from "./pages/GradedCard";
import Sell from "./pages/Sell";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>

    <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SingleCard />} />
          <Route path="/graded" element={<GradedCard />} />
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </div>
    </>
  )
}

export default App