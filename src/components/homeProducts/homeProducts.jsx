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

                                            : <button onClick={ () => addProductToCart(product)} style={{width: "85px" }} className="button-product-add">
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

                                            : <button onClick={ () => addProductToCart(product)} style={{width: "85px" }} className="button-product-add">
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

                                            : <button onClick={ () => addProductToCart(product)} style={{width: "85px" }} className="button-product-add">
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