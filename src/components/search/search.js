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
import { useSearchParams,useNavigate,Navigate,Link } from 'react-router-dom';
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
                <div className="body-search">
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
                                                    products.length >= 1

                                                        ?  products.map( (product) =>  
                                                                {
                                                                    const imageFile    = product["product_image_tag"]
                                                                    const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                                                    const id = product["id"]
                                                                    return (
                                                                    <div className="product-item">
                                                                        <div className="add-to-favorites-container-search"><svg fill="#000000" height="35px" width="35px" version="1.1 "viewBox="0 0 455 455"> <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769 l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029 c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368 c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771 c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"></path></svg></div>
                                                                        <Link to={`/${formatedName}/${id}`}>
                                                                        <img className="search-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                                        </Link>
                                                                        {
                                                                            expandAddButton[product["id"]]
                                                                                ? <button style={{width: "230px" }} className="button-product-add">
                                                                                    <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                                                        <label>-</label>
                                                                                    </div>
                                                                                    <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                                                    <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                                                        <label>+</label>
                                                                                    </div>
                                                                                </button> 

                                                                                : <button onClick={ () => addProductToCart(product)} style={{width: "85px" }} className="button-product-add">
                                                                                    <div>Add</div>
                                                                                </button>
                                                                        }
                                                                        <div className="product-price-search">${product['price']}</div>
                                                                        <p className="product-name-search">{product['product_name']}</p>
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
                </div>
                <Footer />
            </div>

        : <Navigate to="/" replace />
    )
}

export default Search
