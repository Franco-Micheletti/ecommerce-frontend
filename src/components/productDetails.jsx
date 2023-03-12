import React,{useEffect} from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../api/fetchOneProduct";
import { useSelector } from "react-redux";
import { store } from "../state/store";
import '../css/productDetails.css';
import { removeProductFromCart } from "./cart/functions/removeProductFromCart";
import { addProductToCart } from "./cart/functions/addProductToCart";

export const ProductDetails = () => {

    let {productName,productId} = useParams()
    // State
    const productData = useSelector((store) => store.specificProductReducer)
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)

    useEffect(() => {
        if (productId) {
            fetchOneProduct(productId)
        }
    }, [])
    
    return (
        <div>
            <Navbar />
            { 
                productData
                    
                    ?   <div className="product-page-container">
                            <div className="product-data-container">
                                <div>
                                    <div className="button-scroll-up-container">
                                        <button id="scroll-up" className="scroll-up"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                    </div>
                                    <div className="small-images-container">
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                        <img className="product-image-small" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                    </div>
                                    <div className="button-scroll-down-container">
                                        <button id="scroll-down" className="scroll-down"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                    </div>
                                </div>
                                <img className="product-image-big" src={require(`../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                <div className="product-right-panel">
                                    <div className="right-panel-basic">
                                        <label className="brand-name">{productData["basic"]["brand"]["brand_name"]}</label>
                                        <label className="product-details-name">{productData["basic"]["product_name"]}</label>
                                        <div className="user-score">
                                            <div className="star-fill"></div>
                                        </div>
                                        <label className="product-details-price">$ {productData["basic"]["price"]}</label>
                                        {
                                        expandAddButton[productData["basic"]["id"]]
                                            ? <button style={{width: "140px",gap:"20px"}} className="product-detailed-page-add-button">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(productData["basic"]["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[productData["basic"]["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(productData["basic"])}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(productData["basic"])} style={{width: "130px"}} className="product-detailed-page-add-button">
                                                <div>Add</div>
                                                </button>
                                        }
                                    </div>
                                    <div className="product-variations">
                                        <div>Color: Black</div> 
                                        <div className="colors-list">
                                            <div className="color-brown color-variation-item"></div>
                                            <div className="color-white color-variation-item"></div>
                                            <div className="color-beige color-variation-item"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-all-info">
                                <div className="product-all-info-title">Product Details</div>
                                {
                                    Object.keys(productData["properties"]).map( (nameParameter,index) => {
                                        
                                        const name = nameParameter.charAt(0).toUpperCase() + nameParameter.slice(1).replaceAll("_"," ")
                                        const value = productData["properties"][nameParameter]
                                        return (
                                        <div className="product-property-item">
                                            <div className="product-property-name">{name}</div>
                                            <div className="product-property-value">{value}</div>
                                        </div>
                                        )
                                    })
                                }
                                <div>
                                
                                </div>
                            </div>
                        </div>
                    : <></>
                    
            }
            <Footer />
        </div>
    )
}