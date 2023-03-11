import React, { useEffect } from "react"
// COMPONENTS
import Footer from "../footer"
import Navbar from "../navbar/navbar"
// CSS
import '../../css/cart.css'
// REDUX 
import { useSelector,useDispatch } from "react-redux"
import { cartListRemove } from "../../state/cart/cartSlices"
import { cartCounterDecrease } from "../../state/cart/cartSlices"
import { fetchPopularProducts } from "../../api/fetchPopularProducts"
// FUNCTIONS
import { addProductToCart} from "../cart/functions/addProductToCart";
import { removeProductFromCart } from "./functions/removeProductFromCart"
import { handleHorizontalScrolling } from "../homeProducts/functions/handleHorizontalScrolling"
import { Link } from "react-router-dom"

const Cart = () => {

    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    // Get products in cart
    const productsInCart = useSelector( (store) => store.cartListReducer)
    // Redux
    const dispatch = useDispatch()
    const numberOfproductsInCart = useSelector( (store) => store.cartCounterReducer)
    const popularProducts = useSelector( (store) => store.popularProductsForCartReducer)
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
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

    function handleMouseOverProductInCart(e,index) {

        const background = document.getElementById("hover-product-cart-black-background-"+index)
        const options    = document.getElementById("product-options-cart-container-"+index)
        
        options.style.display = "flex"
        background.style.display = "none"
    }

    function handleMouseOutProductInCart(e,index) {

        const background = document.getElementById("hover-product-cart-black-background-"+index)
        const options    = document.getElementById("product-options-cart-container-"+index)
        
        options.style.display = "none"
        background.style.display = "inline-flex"
    }
    
    useEffect( () => {
        if (numberOfproductsInCart === 0) {
            fetchPopularProducts()
        }
    },[numberOfproductsInCart])
    

    return(
        <div>
            <Navbar />
                {
                    numberOfproductsInCart > 0
                                ?   <div className="cart-page">
                                        <div className="buy-products-container">
                                            <div className="total-products-in-cart">
                                                <div className="text-cart">Cart</div> 
                                                <label>({numberOfproductsInCart} items)</label>
                                            </div>
                                            <div className="products-items-cart-wraper">
                                                <div id="product-list-in-cart-container" className="product-list-in-cart-container">
                                                    {
                                                        productsInCart?.map( (product,index) =>  {
                                                            const imageFile = product["product_image_tag"]
                                                            
                                                            return(
                                                                    <div onMouseOut={(e) => {handleMouseOutProductInCart(e,index)}} onMouseOver={(e) => {handleMouseOverProductInCart(e,index)}} className="product-info-item-cart">
                                                                        <div id={`product-options-cart-container-${index}`} className="product-options-cart-container">
                                                                            <div onClick={() => removeProductFromCart(product["id"])} className="remove-product-from-cart-button-container">
                                                                                <div className="product-options-cart-text">REMOVE</div>
                                                                            </div>
                                                                            <div onClick={ () => addProductToCart(product)} className="add-product-from-cart-button-container">
                                                                                <div  className="product-options-cart-text">ADD</div>
                                                                            </div>
                                                                            <div className="details-product-from-cart-button-container">
                                                                                <Link to={`/product/${product}`}/>
                                                                                <div className="product-options-cart-text">DETAILS</div>
                                                                            </div>
                                                                        </div>
                                                                        <div id={`hover-product-cart-black-background-${index}`} className="hover-product-cart-black-background">
                                                                            <div className="product-name-image-container">
                                                                                <img className="cart-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                                                {   screenWidth < 480
                                                                                        ? product["product_name"].length > 30
                                                                                            ? <label className="cart-product-name">{product['product_name'].slice(0,30)}...</label>
                                                                                            : <label className="cart-product-name">{product['product_name']}</label>
                                                                                        : screenWidth < 609
                                                                                            ? product["product_name"].length > 40
                                                                                                ? <label className="cart-product-name">{product['product_name'].slice(0,40)}...</label>
                                                                                                : <label className="cart-product-name">{product['product_name']}</label>
                                                                                            :screenWidth < 800
                                                                                                ? product["product_name"].length > 65
                                                                                                    ? <label className="cart-product-name">{product['product_name'].slice(0,65)}...</label>
                                                                                                    : <label className="cart-product-name">{product['product_name']}</label>
                                                                                                : product["product_name"].length > 110
                                                                                                    ? <label className="cart-product-name">{product['product_name'].slice(0,110)}...</label>
                                                                                                    : <label className="cart-product-name">{product['product_name']}</label>
                                                                                    
                                                                                }
                                                                            </div>
                                                                            <label className="cart-product-quantity">{product['quantity']}</label>
                                                                            <label className="unit-price-cart"> ${product['price'].toFixed(2)}</label>
                                                                        </div>
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
                                        <div className="cart-checkout">
                                            <div className="cart-checkout-title">Checkout</div>
                                            <div className="payment-method-container">
                                                <div className="payment-method-title">Payment Method</div>
                                                <div className="payment-method-selected">Credit Card</div>
                                            </div>
                                            <div className="cart-checkout-pay-button-container">
                                                <button className="cart-checkout-pay-button">Pay</button>
                                            </div>
                                        </div>
                                        <div className="popular-products-text">Check out this popular products!</div>
                                        <div className="popular-products-wraper">
                                            <div>
                                                <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                            <div id="popular-cookies-snacks" className="popular-products-home">
                                                
                                                { 
                                                popularProducts?.map( (product) => {
                                                    {   
                                                        const imageFile = product["product_image_tag"]
                                                        return (
                                                            <div className="popular-product-item">
                                                                <img className="home-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                                {
                                                                expandAddButton[product["id"]]
                                                                    ? <button style={{width: "140px" }} className="button-product-add">
                                                                        <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                                            <label>-</label>
                                                                        </div>
                                                                        <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                                        <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                                            <label>+</label>
                                                                        </div>
                                                                        </button> 

                                                                    : <button onClick={ () => addProductToCart(product)} style={{width: "130px" }} className="button-product-add">
                                                                        <div>Add</div>
                                                                        </button>
                                                                }
                                                                <div className="product-price-search">${product['price']}</div>
                                                                <p className="popular-products-product-name">{product['product_name']}</p>
                                                            </div>)
                                                    }
                                                })
                                                }   
                                            </div>
                                            <div>
                                                <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                        </div>
                                    </div>
                            
                            :   <div className="cart-page">
                                    
                                        <div className="cart-message-container">
                                            <div><img className="empty-cart-image" src={require(`../../images/empty-cart.webp`)}></img></div>
                                            <div className="no-products-incart-text">You haven't added a product yet</div>
                                            <div className="no-products-incart-text">Check out this popular products.</div>
                                        </div>

                                        <div className="popular-products-wraper">
                                            <div>
                                                <button id="scroll-left-1" onClick ={ () => handleHorizontalScrolling("left",1,"popular-cookies-snacks")}className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                            <div id="popular-cookies-snacks" className="popular-products-home">
                                                
                                                { 
                                                popularProducts?.map( (product) => {
                                                    {   
                                                        const imageFile = product["product_image_tag"]
                                                        return (
                                                            <div className="popular-product-item">
                                                                <img className="home-product-image" src={require(`../../images/${imageFile}.webp`)}></img>
                                                                {
                                                                expandAddButton[product["id"]]
                                                                    ? <button style={{width: "140px",gap:"20px"}} className="button-product-add">
                                                                        <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                                            <label>-</label>
                                                                        </div>
                                                                        <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                                        <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                                            <label>+</label>
                                                                        </div>
                                                                        </button> 

                                                                    : <button onClick={ () => addProductToCart(product)} style={{width: "130px"}} className="button-product-add">
                                                                        <div>Add</div>
                                                                        </button>
                                                                }
                                                                <div className="product-price-search">${product['price']}</div>
                                                                <p className="popular-products-product-name">{product['product_name']}</p>
                                                            </div>)
                                                    }
                                                })
                                                }   
                                            </div>
                                            <div>
                                                <button id="scroll-right-1" onClick ={ () => handleHorizontalScrolling("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                        </div>
                                    
                                </div>
                }               
                
            
            <Footer />
        </div>
        
    )
}

export default Cart