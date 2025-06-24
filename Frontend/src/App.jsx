import { Routes, Route } from "react-router-dom"
import "./index.css"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import Company from "./pages/About"
import Orders from "./pages/Orders"
import Placeorder from "./pages/Placeorder"
import Contact from "./pages/Contact"
import Collection from "./pages/Collection"
import Footer from "./components/Footer"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import About from "./pages/About"

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vm] lg:px-[9vm]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/About" element={<About />} />
        <Route path="/product/:productId" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-orders" element={<Placeorder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

