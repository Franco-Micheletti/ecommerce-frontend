

import '../../css/home.css'
import '../../css/userOptions.css' 
import Footer from '../footer';
import SearchResults from "../searchResults/searchResults";
import Navbar from '../navbar'
import React, { useEffect } from "react";
import '../../css/products.css'
import '../../css/body.css'
import Filters from '../filters/filters'
import { addProductToCart } from "../cart/functions/addProductToCart";
import { useSelector } from "react-redux";
import { store } from "../../state/store";

const Search = () => {

    var filters        = useSelector( (store) => store.filtersReducer)
    var products       = useSelector( (store) => store.productsReducer)
    var searchedString = useSelector( (store) => store.stringInputReducer)
    
    store.subscribe(()=> {
        filters        = store.getState().filtersReducer
        products       = store.getState().productsReducer
        searchedString = store.getState().stringInputReducer
    })

    return ( 
        <div>
            <Navbar />
            <body className="body-home">
            {
                products && filters
                    ?   <div className="body-container">
                            <Filters filters={filters} />
                            <div className="results">
                                <span className="title-results"><h4>Results for:</h4><label>"{ searchedString }" ( {products.length} )</label></span>
                                <div className="products-list-container">
                                    { 
                                        products.map( (keys) =>  
                                            {
                                                const imageFile = keys["product"]["product_image_tag"]
                                                return (
                                                <div className="product-item">
                                                    <img src={require(`../../images/${imageFile}.webp`)} width="170" height="170"></img>
                                                    <button onClick={ () => addProductToCart(keys["product"])} className="button-product-add">Add</button> 
                                                    <div className="product-price-search">${keys["product"]['price']}</div>
                                                    <p className="popular-products-product-name">{keys["product"]['product_name']}</p>
                                                </div>)
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        
                    :   <div className="body-container">
                            <Filters />
                            <div className="no-results">
                                <h1>No products have been found , check your spelling or use the filter available in the left side. </h1>
                            </div>
                        </div>
                    
            }
        </body>
        <Footer />
    </div>
    )
}

export default Search
