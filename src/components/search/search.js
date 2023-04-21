import React, { useEffect,useRef, useState} from "react";
import jwt from "jwt-decode";
// RESOURCES
import { arrowUpSvg,arrowDownSvg } from "../../utilities/resources";
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
import { useSelector,useDispatch } from "react-redux";
import { addOrderByToList,removeOrderByFromList } from "../../state/filters/filtersSlices";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { fetchProductsByName,fetchAndApplyFilter } from '../../api/fetchProductsByName';
import { toggleFiltersContainer } from "./functions/filtersContainer";
import { addProductToUserFavorites,removeProductFromUserFavorites } from "../../api/favoriteProduct";
// ROUTER
import { useSearchParams,useNavigate,Navigate,Link } from 'react-router-dom';
import { removeProductFromCart } from "../cart/functions/removeProductFromCart";

const Search = () => {

    // States
    const filters             = useSelector((store)=> store.filtersReducer)
    const products            = useSelector((store)=> store.productsReducer)
    const pagesList           = useSelector((store)=> store.pagesListReducer)
    const pageSelected        = useSelector((store) => store.pageReducer)
    const totalResults        = useSelector((store) => store.totalResultsReducer)
    const expandAddButton     = useSelector((store) => store.expandAddButtonListReducer)
    const dataLoading         = useSelector((store) => store.dataLoadingReducer)
    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)
    const showMobileFilterContainer = useSelector((store) => store.showMobileFilterContainerReducer)
    const [showSortWindow,setShowSortWindow] = useState(false)
    // Use ref
    const productListRef    = useRef()
    const priceAsc          = useRef()
    const priceDesc         = useRef()
    const dateAsc           = useRef()
    const dateDesc          = useRef()
    const popularityAsc     = useRef()
    const popularityDesc    = useRef()
    const scoreAsc          = useRef()
    const scoreDesc         = useRef()
    const packAsc           = useRef()
    const packDesc          = useRef()
    const speedAsc          = useRef()
    const speedDesc         = useRef()
    const sortBackground    = useRef()
    const filtersBackground = useRef()
    const dispatch          = useDispatch()

    // Search params
    const [ searchParams,setSearchParams] = useSearchParams()
    const searchInput     = searchParams.get("q" || null)
    const page            = searchParams.get("page" || null)
    const filtersApplied  = searchParams.get("filters" || "")
    const orderByList     = searchParams.get("orderBy" || "")

    // Get user id 
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }
    
    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    useEffect(() => {
      
        return () => {
            setShowSortWindow(false)
        }
    }, [])

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
                if ( searchInput && page && !filtersApplied ) {
                    fetchProductsByName(searchInput,page,orderByList)
                }
                else if ( searchInput && page && filtersApplied ) {
                    fetchAndApplyFilter(searchInput,page,filtersApplied,orderByList)
                }
            }
        }
        
    },[searchInput,filtersApplied,page,orderByList])

    const handleSelectOrderBy = (orderByString,element,elementAlt) => {

        let orderByList = store.getState().orderByListReducer
        // Toggle add / remove from list
        if (orderByList.includes(orderByString) !== true) {
            element.current.style.backgroundColor = "#7ed0ec"
            dispatch(addOrderByToList(orderByString))
            // Remove alternate
            if (orderByList.includes(elementAlt.current.id) === true) {
                elementAlt.current.style.backgroundColor = "#e9e8e8"
                dispatch(removeOrderByFromList(elementAlt.current.id))
            } 
        } else {
            element.current.style.backgroundColor = "#e9e8e8"
            dispatch(removeOrderByFromList(orderByString))
        }
        
        // Get updated list and set search params
        orderByList = store.getState().orderByListReducer
        const orderByListToString = orderByList.toString()
        
        if (filtersApplied === null || filtersApplied === "") {
            if (orderByListToString.length > 0) {
                setSearchParams({ q:searchInput,page:page,orderBy:orderByListToString})
            } else {
                setSearchParams({ q:searchInput,page:page})
            }
        } else {
            if (orderByListToString.length > 0) {
                setSearchParams({ q:searchInput,page:page,filters:filtersApplied,orderBy:orderByListToString})
            } else {
                setSearchParams({ q:searchInput,page:page,filters:filtersApplied})
            }
            
        }
        

    }
    
    
    
    const handleToggleSortWindow = () => {
        if (showSortWindow === true) {
            setShowSortWindow(false)
            document.body.style.position = "static"
        } else {
            setShowSortWindow(true)
            setTimeout(() => {
                document.body.style.position = "fixed"
                sortBackground.current.addEventListener("click",clickOutsideSort,{ once: true })
            }, 10);
            
        }
    }
    
    const clickOutsideSort = () => {
        document.body.style.position = "static"
        setShowSortWindow(false)
    }                                                   
    
    return (
        searchInput && page
            ?<div>
                <Navbar />
                <div className="body-search">
                    {
                        showSortWindow
                            ?   <div style={{visibility: showSortWindow ? "visible" : "hidden",opacity: 0.5}} ref={sortBackground} id="toggle-sort-black-background" className="toggle-sort-black-background"></div>
                            :   <></>
                    }
                    {
                        products && filters && pagesList
                            
                            ?   <div>
                                    <div className="body-container-search">
                                        
                                        {   
                                            screenWidth < 1240
                                                ?   <div style={{visibility: showMobileFilterContainer ? "visible" : "hidden"}} ref={filtersBackground} id="toggle-filter-black-background" className="toggle-filter-black-background"></div>
                                                :   <></>     
                                            
                                        }
                                        {
                                            screenWidth > 1240
                                                ?   <Filters filters={filters} />
                                                :   showMobileFilterContainer
                                                        ?   <Filters filters={filters} />
                                                        :   <></>
                                        }
                                        <div className="results">
                                            <div className="results-container">
                                                <div className="button-title-results-wraper">
                                                    <button id="button-show-filters-container" onClick={toggleFiltersContainer} className="button-show-filters-container">
                                                        <svg viewBox="0 0 24 24" focusable="false" style={{pointeEvents: "none",display: "block",width: "100%",height: "100%"}}><g><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path></g></svg>
                                                    </button>
                                                    <span className="title-results"><h4>Results for:</h4><label>"{ searchInput }" ( {totalResults} )</label></span>
                                                    <div onClick={handleToggleSortWindow} className="order-by-container">
                                                        <label>Sort by</label>
                                                        <svg className="toggle-show-sort" style={{rotate: showSortWindow ? "180deg" : "0deg" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(56 60 75);"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                                    </div>
                                                    <div style={{visibility: showSortWindow ? "visible" : "hidden"}} className="order-by-options-list">
                                                            <div id="order-by-price" className="order-by-option">
                                                                <div id={"price"} ref={priceAsc} className="toggle-sort-button"   onClick={() => handleSelectOrderBy("price",priceAsc,priceDesc) } >
                                                                    {arrowUpSvg}
                                                                </div>
                                                                <div id={"-price"} ref={priceDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-price",priceDesc,priceAsc)  } >
                                                                    {arrowDownSvg}
                                                                </div>
                                                                <label>Price</label>
                                                            </div>
                                                            <div id="order-by-datetime" className="order-by-option">
                                                                <div id={"date"}  ref={dateAsc} className="toggle-sort-button"  onClick={() => handleSelectOrderBy("date",dateAsc,dateDesc) }>
                                                                    {arrowUpSvg}</div>
                                                                <div id={"-date"} ref={dateDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-date",dateDesc,dateAsc)  }>
                                                                    {arrowDownSvg}</div>
                                                                <label>Date</label>
                                                            </div>
                                                            <div id="order-by-popularity" className="order-by-option">
                                                                <div id={"popularity"}  ref={popularityAsc} className="toggle-sort-button"   onClick={() => handleSelectOrderBy("popularity",popularityAsc,popularityDesc) }>{arrowUpSvg}</div>
                                                                <div id={"-popularity"}  ref={popularityDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-popularity",popularityDesc,popularityAsc) }>{arrowDownSvg}</div>
                                                                <label>Popularity</label>
                                                            </div>
                                                            <div id="order-by-score" className="order-by-option">
                                                                <div id={"score"}  ref={scoreAsc} className="toggle-sort-button"   onClick={() => handleSelectOrderBy("score",scoreAsc,scoreDesc) }>
                                                                    {arrowUpSvg}</div>
                                                                <div id={"-score"}  ref={scoreDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-score",scoreDesc,scoreAsc) }>
                                                                    {arrowDownSvg}</div>
                                                                <label>Customer Review</label>
                                                            </div>
                                                            <div id="order-by-pack" className="order-by-option">
                                                                <div id={"pack"}  ref={packAsc}   className="toggle-sort-button" onClick={() => handleSelectOrderBy("pack",packAsc,packDesc) }>
                                                                    {arrowUpSvg}</div>
                                                                <div id={"-pack"}  ref={packDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-pack",packDesc,packAsc) }>
                                                                    {arrowDownSvg}</div>
                                                                <label>Pack #</label>
                                                            </div>
                                                            <div id="order-by-speed" className="order-by-option">
                                                                <div id={"speed"}  ref={speedAsc}   className="toggle-sort-button" onClick={() => handleSelectOrderBy("speed",speedAsc,speedDesc) }>
                                                                    {arrowUpSvg}</div>
                                                                <div id={"-speed"}  ref={speedDesc} className="toggle-sort-button" onClick={() => handleSelectOrderBy("-speed",speedDesc,speedAsc) }>
                                                                    {arrowDownSvg}</div>
                                                                <label>Speed</label>
                                                            </div>
                                                        </div>
                                                </div>
                                                <div ref={productListRef} className="products-list-container">
                                                {
                                                    products.length >= 1

                                                        ?  products.map( (product,index) =>  
                                                                {   
                                                                    const imageFile    = product["product_image_tag"]
                                                                    const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                                                    const id = product["id"]
                                                                    return (
                                                                    <div key={index} className="product-item">
                                                                        {   
                                                                        favoritesIconChange.includes(product["id"]) === true
                                                                            ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-added">
                                                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0"></path></svg>
                                                                                </div>
                                                                            :   <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon">
                                                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0"></path></svg>
                                                                                </div>
                                                                        }
                                                                        <Link aria-label="See product details" to={`/${formatedName}/${id}`}>
                                                                            <img className="search-product-image" width={"320"} height={"320"} alt="product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
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
                                                                        <div className="shipping-days"><div>{product['shipping_days']}+</div><div>Shipping Days</div></div>
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
                                                        ? filtersApplied
                                                            ?   <div onClick={() => setSearchParams({ q:searchInput,page:page_number,filters:filtersApplied}) } className="page-selected">{page_number}</div>
                                                            :   <div onClick={() => setSearchParams({ q:searchInput,page:page_number}) } className="page-selected">{page_number}</div>
                                                        : filtersApplied
                                                            ?   <div onClick={() => setSearchParams({ q:searchInput,page:page_number,filters:filtersApplied}) } className="page-item-container">{page_number}</div>
                                                            :   <div onClick={() => setSearchParams({ q:searchInput,page:page_number}) } className="page-item-container">{page_number}</div>
                                                )
                                                } ))
                                            
                                            :   <></>
                                                
                                    }
                                    </div>
                                </div>

                            :  <TemplateSkeletonSearch />
                                    
                    }
                </div>
                <Footer />
            </div>

        : <Navigate to="/" replace />
    )
}

export default Search
