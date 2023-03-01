import React, { useEffect } from "react"
import Footer from "../footer"
import Navbar from "../navbar/navbar"
import '../../css/cart.css'
import { useSelector } from "react-redux"

const Cart = () => {
    
    // Get products in cart
    const productsInCart = useSelector( (store) => store.cartListReducer)
    console.log(productsInCart)
    // Number of products
    const numberOfproductsInCart = useSelector( (store) => store.cartCounterReducer)
    // Sum prices
    var totalPrice = 0
    productsInCart?.map( (product) => {
        if(product["quantity"] > 1) {
            totalPrice += product["price"] * product["quantity"]
        } 
        else {
            totalPrice += product["price"]
        }
    })
    // Scrolling
    var movingUp = false
    var movingDown = false
    
    function handleScrollUp() {
        if (movingUp === false ) {
            // movingUp = true
            const container = document.getElementById("product-list-in-cart-container")
            container.scrollTop -= 111
        }
        // Cooldown
        // setTimeout(function() {movingUp = false},300)
    }
    function handleScrollDown() {
        if (movingDown === false ) {
            // movingDown = true
            const container = document.getElementById("product-list-in-cart-container")
            container.scrollTop += 111
        }
        // Cooldown
        // setTimeout(function() {movingDown = false},300)
    }
    
    return(
        <div>
            <Navbar />
            <div className="cart-page">
                <div className="buy-products-container">
                    <div className="total-products-in-cart">
                        <div className="text-cart">Cart</div> 
                        <label>({numberOfproductsInCart} items)</label>
                        <img className="cart-icon-in-cart" src={require("../../images/cart-2.png")}></img>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop: "40px"}}>
                        <div id="product-list-in-cart-container" className="product-list-in-cart-container">
                            {
                                productsInCart?.map( (product) =>  {
                                    console.log(product)
                                    const imageFile = product["product_image_tag"]
                                    return(
                                            <div className="product-info-item-cart">
                                                <img src={require(`../../images/${imageFile}.webp`)} width="80" height="80"></img>
                                                <label className="cart-product-name">{product['product_name'].slice(0,30)}...</label>
                                                <label className="unit-price-cart"> ${product['price'].toFixed(2)}</label>
                                                <label className="cart-product-quantity">{product['quantity']}</label>
                                            </div>)
                                })
                            }
                        </div>
                        <div className="buttons-scroll-cart">
                            <button id="scroll-up-1"   onClick={()=> handleScrollUp()}className="vertical-scroll-up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                            <button id="scroll-down-1" onClick={()=> handleScrollDown()} className="vertical-scroll-down"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                        </div>
                    </div>
                    <div className="total-price-in-cart">Total:<label> ${totalPrice.toFixed(2)}</label></div>
                </div>
                <div className="cart-checkout"></div>
            </div>
            <Footer />
        </div>
        
    )
}

export default Cart