import React, { useEffect } from "react";
// CSS IMPORTS
import '../../css/home.css'
import '../../css/userOptions.css' 
import '../../css/products.css'
import '../../css/body.css'
// COMPONENTS IMPORTS
import Footer from '../footer';
import Navbar from '../navbar/navbar'
import Filters from '../filters/filters'
// REDUX
import { store } from "../../state/store";
import { setProducts,setFilters } from '../../state/products/productsSlices';
import { useDispatch,useSelector } from "react-redux";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { fetchProductsByName,fetchAndApplyFilter } from '../../api/fetchProductsByName';
// ROUTER
import { useParams } from 'react-router-dom';



const Search = () => {

    const filters  = useSelector((store)=> store.filtersReducer)
    const products = useSelector((store)=> store.productsReducer)

    
    const {searchInput,urlString} = useParams()

    useEffect(  () => {
        if (searchInput.length > 1) {
            
            if ( searchInput && !urlString) {
                fetchProductsByName(searchInput)
            }
            else if ( searchInput && urlString ) {
                fetchAndApplyFilter(searchInput,urlString)
                // filters  = store.getState().filtersReducer
                // products = store.getState().productsReducer
            } 
        }
    },[searchInput,urlString])
    
    
    return ( 
        <div>
            <Navbar />
            <body className="body-home">
            {
                products && filters
                    ?   <div className="body-container">
                            <Filters filters={filters} />
                            <div className="results">
                                <span className="title-results"><h4>Results for:</h4><label>"{ searchInput }" ( {products.length} )</label></span>
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
