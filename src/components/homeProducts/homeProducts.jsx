import React,{useEffect} from "react";
// CSS IMPORTS
import '../../css/products.css'
import '../../css/home.css'
import '../../css/skeleton.css'
// REDUX
import { useSelector } from "react-redux";
// API
import { fetchHomeProducts } from "../../api/fetchHomeProducts";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { handleHorizontalScrolling } from "./functions/handleHorizontalScrolling";
// COMPONENTS
import { TemplateSkeletonHome } from "../templateSkeletonHome"


const HomeProducts = () => {
    
    // States
    const products = useSelector( (store) => store.homeProductsReducer)
    const loaded  = useSelector( (store) => store.dataLoadingReducer)

    useEffect( () => {
        // fetchAllProducts to show at home or different categories of popular products
        fetchHomeProducts()
    },[]) 

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            // Show popular products in Cookies & Snack category
            <div>
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
                                        <button onClick={ () => addProductToCart(product)} className="button-product-add">Add</button> 
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
                                        <button onClick={ () => addProductToCart(product)} className="button-product-add">Add</button> 
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
                                    <button onClick={ () => addProductToCart(product)} className="button-product-add">Add</button> 
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