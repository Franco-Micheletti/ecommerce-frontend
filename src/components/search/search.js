import React, { useEffect,useRef} from "react";
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
import { useSelector } from "react-redux";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { fetchProductsByName,fetchAndApplyFilter } from '../../api/fetchProductsByName';
import { toggleFiltersContainer } from "./functions/filtersContainer";
// ROUTER
import { useSearchParams,useNavigate,Navigate } from 'react-router-dom';
import { removeProductFromCart } from "../cart/functions/removeProductFromCart";

const Search = () => {

    const filters         = useSelector((store)=> store.filtersReducer)
    const products        = useSelector((store)=> store.productsReducer)
    const pagesList       = useSelector((store)=> store.pagesListReducer)
    const pageSelected    = useSelector((store) => store.pageReducer)
    const totalResults    = useSelector((store) => store.totalResultsReducer)
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
    const dataLoading     = useSelector((store) => store.dataLoadingReducer)
    const productListRef  = useRef()
    const navigate        = useNavigate()
    const [ searchParams,setSearchParams] = useSearchParams()
    const searchInput    = searchParams.get("q" || null)
    const page           = searchParams.get("page" || null)
    const filtersApplied = searchParams.get("filters" || "")
    
    useEffect(  () => {
        
        if (searchInput && page) {
            window.scrollTo(
                {
                    top: 0,
                    left: 0,
                    behavior: 'instant'
                }
            )
            if (searchInput.length > 1) {
                if ( searchInput && page && !filtersApplied) {
                    fetchProductsByName(searchInput,page)
                }
                else if ( searchInput && page && filtersApplied  ) {
                    fetchAndApplyFilter(searchInput,filtersApplied,page)
                }
            }
        }
        
    },[searchInput,filtersApplied,page])

    // useEffect(()=> {
        
    // },[expandAddButton])
    
    
    return (
        searchInput && page
            ?<div>
                <Navbar />
                <body className="body-search">
                    {
                        products && filters && pagesList
                            
                            ?   <div>
                                    <div className="body-container-search">
                                        <div id="toggle-filter-black-background" className="toggle-filter-black-background"></div>
                                        <Filters filters={filters} />
                                        <div className="results">
                                            <div className="results-container">
                                                <div className="button-title-results-wraper">
                                                    <button id="button-show-filters-container" onClick={toggleFiltersContainer} className="button-show-filters-container">
                                                    <svg viewBox="0 0 24 24" focusable="false" style={{pointeEvents: "none",display: "block",width: "100%",height: "100%"}}><g><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path></g></svg>
                                                    </button>
                                                    <span className="title-results"><h4>Results for:</h4><label>"{ searchInput }" ( {totalResults} )</label></span>
                                                    <div className="order-by-container">
                                                        <label>Sort by</label>
                                                        <div className="show-order-by-options"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(56 60 75);"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                                            <div className="order-by-options-list">
                                                                <div id="order-by-price"      className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Price</label>
                                                                </div>
                                                                <div id="order-by-dtetime"    className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Datetime</label>
                                                                </div>
                                                                <div id="order-by-popularity" className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Popularity</label>
                                                                </div>
                                                                <div id="order-by-creview"    className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Customer Review</label>
                                                                </div>
                                                                <div id="order-by-pack"       className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Pack #</label>
                                                                </div>
                                                                <div id="order-by-speed"      className="order-by-option">
                                                                    <div>↑</div><div>↓</div>
                                                                    <label>Speed</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div ref={productListRef} className="products-list-container">
                                                {
                                                    products.length > 1

                                                        ?  products.map( (keys) =>  
                                                                {
                                                                    const imageFile = keys["product"]["product_image_tag"]
                                                                    
                                                                    return (
                                                                    <div className="product-item">
                                                                        <img className="search-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                                        {
                                                                            expandAddButton[keys["product"]["id"]]
                                                                                ? <button style={{width: "230px" }} className="button-product-add">
                                                                                    <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(keys["product"]["id"])}>
                                                                                        <label>-</label>
                                                                                    </div>
                                                                                    <div>{expandAddButton[keys["product"]["id"]]["quantity"]}</div>
                                                                                    <div className="expandedAddMoreButton" onClick={ () => addProductToCart(keys["product"])}>
                                                                                        <label>+</label>
                                                                                    </div>
                                                                                </button> 

                                                                                : <button onClick={ () => addProductToCart(keys["product"])} style={{width: "85px" }} className="button-product-add">
                                                                                    <div>Add</div>
                                                                                </button>
                                                                        }
                                                                        <div className="product-price-search">${keys["product"]['price']}</div>
                                                                        <p className="product-name-search">{keys["product"]['product_name']}</p>
                                                                    </div>)
                                                                }
                                                            )

                                                        : <div style={{fontSize:"17px"}}>There are no results matching the search parameters.</div>
                                                        
                                                }  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="all-pages-container">
                                    {   
                                        pagesList.length > 1
                                            ? (pagesList.map((page_number,index)=> {
                                                
                                                return (
                                                    parseInt(page) === page_number
                                                        ? <div onClick={() => setSearchParams({ q:searchInput,page:page_number,filters:filtersApplied}) } className="page-selected">{page_number}</div>
                                                        : <div onClick={() => setSearchParams({ q:searchInput,page:page_number,filters:filtersApplied}) } className="page-item-container">{page_number}</div>
                                                )
                                                } ))
                                            
                                            :  pagesList.length === 1
                                                ? <div className="page-item-container">{1}</div>
                                                : <></>
                                                
                                    }
                                    </div>
                                </div>

                            :  dataLoading === true
                                    ? <TemplateSkeletonSearch />
                                    : <div>NO PRODUCT FOUND</div>
                    }
                </body>
                <Footer />
            </div>

        : <Navigate to="/" replace />
    )
}

export default Search
