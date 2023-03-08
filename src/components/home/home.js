import React from "react";
import '../../css/products.css'
import '../../css/home.css'
import '../../css/userOptions.css' 
import Footer from '../footer';
import HomeProducts from "../homeProducts/homeProducts";
import Navbar from '../navbar/navbar'


const Home = () => {

    return (
        
        <div>
            <Navbar />
            <HomeProducts />
            <Footer />
        </div>
        
    )
    
}

export default Home
