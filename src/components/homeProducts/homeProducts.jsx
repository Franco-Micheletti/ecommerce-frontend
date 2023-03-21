import React,{useEffect,useRef} from "react";
// CSS IMPORTS
import '../../css/products.css'
import '../../css/home.css'
import '../../css/skeleton.css'
// REDUX
import { useSelector,useDispatch } from "react-redux";
import { resetAppliedFiltersList } from "../../state/products/productsSlices";
// API
import { fetchHomeProducts } from "../../api/fetchHomeProducts";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { removeProductFromCart } from "../cart/functions/removeProductFromCart";
import { handleHorizontalScrolling } from "./functions/handleHorizontalScrolling";
// COMPONENTS
import { TemplateSkeletonHome } from "../templateSkeletonHome"
import { useNavigate,createSearchParams } from "react-router-dom";
// ROUTER
const HomeProducts = () => {
    
    // States
    const products = useSelector( (store) => store.homeProductsReducer)
    const loaded  = useSelector( (store) => store.dataLoadingReducer)
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const prodTypes = useRef([])

    useEffect( () => {
        // fetchAllProducts to show at home or different categories of popular products
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: 'instant'
            }
        )
        fetchHomeProducts()

        for(let i = 1;i<6;i++) {
            setTimeout(()=> {
                prodTypes.current[i-1].style.top = 0
            },i*100)
        }
    },[]) 

    const goToProductType = (q) => {
        dispatch(resetAppliedFiltersList())
        const params = { q: q, page: '1' };
        navigate({
        pathname: '/search/',
        search: `?${createSearchParams(params)}`,
        });
    }

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            // Show popular products in Cookies & Snack category
            <div className="body-home">
                <div className="home-navigate-product-types">
                    <div onClick={()=> goToProductType("table")} ref={(el) => prodTypes.current[0] = el} className="navigate-product-type-home">Coffe Tables</div>
                    <div onClick={()=> goToProductType("laptop")} ref={(el) => prodTypes.current[1] = el} className="navigate-product-type-home">Laptops</div>
                    <div onClick={()=> goToProductType("Energy Drinks")} ref={(el) => prodTypes.current[2] = el} className="navigate-product-type-home">Energy Drinks</div>
                    <div onClick={()=> goToProductType("Soda Pop")} ref={(el) => prodTypes.current[3] = el} className="navigate-product-type-home">Soda Pop</div>
                    <div onClick={()=> goToProductType("Cookies")} ref={(el) => prodTypes.current[4] = el} className="navigate-product-type-home">Cookies</div>
                </div>
                <div className="cards-container">
                    <div className="tvs-card">
                        <img className="tvs-card-image" src={require(`../../images/tvs.webp`)}></img>
                        <div className="cards-text">Get our new 4k TVs directly from our main store.</div>
                    </div>
                    <div className="home-card">
                        <img className="home-card-image" src={require(`../../images/home.webp`)}></img>
                        <div className="cards-text">Decorate your home with the best furnitures.</div>
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div id="popular-cookies-snacks" className="popular-products-home">
                        
                        { 
                        products.map( (product) =>
                            
                            {   
                                const imageFile = product["product_image_tag"]
                                return (
                                    <div className="popular-product-item">
                                        <div className="add-to-favorites-container-home">
                                            <svg fill="#000000" height="35px" width="35px" version="1.1 "viewBox="0 0 455 455"> <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769 l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029 c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368 c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771 c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"></path></svg>
                                        </div>
                                        {/* <div className="added-favorite-container">
                                            <svg viewBox="0 0 24 24" fill="none"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" fill="#222222"></path></svg>
                                        </div> */}
                                        <img className="home-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                        {
                                        expandAddButton[product["id"]]
                                            ? <button style={{width: "150px" }} className="button-product-add">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(product)} className="button-product-add">
                                                <div>Add</div>
                                                </button>
                                        }
                                        <div className="product-price-search">${product['price']}</div>
                                        <p className="popular-products-product-name">{product['product_name']}</p>
                                    </div>
                                    )
                            }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div id="popular-cookies-snacks" className="popular-products-home">
                        
                        { 
                        products.map( (product) =>
                                
                            {   
                                const imageFile = product["product_image_tag"]
                                return (
                                    <div className="popular-product-item">
                                        <img className="home-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                        {
                                        expandAddButton[product["id"]]
                                            ? <button style={{width: "150px" }} className="button-product-add">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(product)} className="button-product-add">
                                                <div>Add</div>
                                                </button>
                                        }
                                        <div className="product-price-search">${product['price']}</div>
                                        <p className="popular-products-product-name">{product['product_name']}</p>
                                    </div>)
                            }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div id="popular-cookies-snacks" className="popular-products-home">
                        
                        { 
                        products.map( (product) =>
                                
                            {   
                                const imageFile = product["product_image_tag"]
                                return (
                                    <div className="popular-product-item">
                                        <img className="home-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                        {
                                        expandAddButton[product["id"]]
                                            ? <button style={{width: "150px" }} className="button-product-add">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(product)} className="button-product-add">
                                                <div>Add</div>
                                                </button>
                                        }
                                        <div className="product-price-search">${product['price']}</div>
                                        <p className="popular-products-product-name">{product['product_name']}</p>
                                    </div>)
                            }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
            </div>
            )
    }
    else {

        return (
            <TemplateSkeletonHome />
        )   
    }
         
}

export default HomeProducts