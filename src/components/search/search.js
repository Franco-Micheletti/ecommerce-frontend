import React from "react";
import '../../css/products.css'
import '../../css/home.css'
import '../../css/userOptions.css' 
import Footer from '../footer';
import SearchResults from "../searchResults/searchResults";
import Navbar from '../navbar'

const Search = () => {

    return (
        
        <div>
            <Navbar />
            <body className="body-home">
            <SearchResults />
            </body>
            <Footer />
        </div>
        
    )
    
}

export default Search
