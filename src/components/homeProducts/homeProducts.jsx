import React,{useEffect} from "react";
import '../../css/products.css'
import '../../css/body.css'
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../../api/fecthAllProducts";
import { addProductToCart } from "../cart/functions/addProductToCart";
import { handleHorizontalScrolling } from "./functions/handleHorizontalScrolling";

const HomeProducts = () => {
    
    // States
    const products = useSelector( (store) => store.homeProductsReducer)

    useEffect( () => {
        // fetchAllProducts to show at home or different categories of popular products
        fetchAllProducts()
    },[]) 

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            // Show popular products in Cookies & Snack category
            <div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                <div id="popular-cookies-snacks" className="popular-products-home">
                        { 
                            products.slice(0,12).map( (product) =>
                                    
                                {   
                                    const imageFile = product["product_image_tag"]
                                    return (
                                        <div className="popular-product-item">
                                        <img src={require(`../../images/${imageFile}.webp`)} width="120" height="120"></img>
                                        <button onClick={ () => addProductToCart(product)} className="button-product-add">Add</button> 
                                        <div className="product-price-search">${product['price']}</div>
                                        <p className="popular-products-product-name">{product['product_name']}</p>
                                    </div>)
                                }
                            )
                        }   
                </div>
                <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
            </div>
        )
    }
    else {
        return (
            <div className="body-container">
                <div className="no-results">
                    <h1>No products</h1>
                </div>
            </div>
        )
    }
         
}

export default HomeProducts