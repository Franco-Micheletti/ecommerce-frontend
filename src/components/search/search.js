import React, { useEffect, useState } from "react";
// CSS IMPORTS
import '../../css/home.css'
import '../../css/userOptions.css' 
import '../../css/products.css'
import '../../css/search.css'
import '../../css/filters.css'
// COMPONENTS IMPORTS
import Footer from '../footer';
import Navbar from '../navbar/navbar'
import Filters from '../filters/filters'
import { TemplateSkeletonSearch } from "../templateSkeletonSearch";
// REDUX
import { store } from "../../state/store";
import { setProducts,setFilters } from '../../state/products/productsSlices';
import { useDispatch,useSelector } from "react-redux";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { fetchProductsByName,fetchAndApplyFilter } from '../../api/fetchProductsByName';
import { toggleFiltersContainer } from "./functions/filtersContainer";
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
            console.log("fire once")
        }
    },[searchInput,urlString])
    
    return ( 
        <div>
            <Navbar />
            <body className="body-search">
            {
            products && filters
                ?   <div className="body-container-search">
                        <div id="toggle-filter-black-background" className="toggle-filter-black-background"></div>
                        <Filters filters={filters} />
                        <div className="results">
                            <div className="results-container">
                                <div className="button-title-results-wraper">
                                    <button id="button-show-filters-container" onClick={toggleFiltersContainer} className="button-show-filters-container">
                                    <svg viewBox="0 0 24 24" focusable="false" style={{pointeEvents: "none",display: "block",width: "100%",height: "100%"}}><g><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path></g></svg>
                                    </button>
                                    <span className="title-results"><h4>Results for:</h4><label>"{ searchInput }" ( {products.length} )</label></span>
                                    <div className="order-by-container">Sort by</div>
                                </div>
                                <div className="products-list-container">
                                    { 
                                        products.map( (keys) =>  
                                            {
                                                const imageFile = keys["product"]["product_image_tag"]
                                                return (
                                                <div className="product-item">
                                                    <img className="search-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                    <button onClick={ () => addProductToCart(keys["product"])} className="button-product-add">Add</button> 
                                                    <div className="product-price-search">${keys["product"]['price']}</div>
                                                    <p className="product-name-search">{keys["product"]['product_name']}</p>
                                                </div>)
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                :   <TemplateSkeletonSearch />
            }
            </body>
            <Footer />
        </div>
    )
}

export default Search
