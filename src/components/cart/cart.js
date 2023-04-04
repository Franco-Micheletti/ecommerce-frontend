import React, { useEffect } from "react"
import jwt from "jwt-decode";
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
import { store } from "../../state/store";
// FUNCTIONS
import { addProductToCart} from "../cart/functions/addProductToCart";
import { removeProductFromCart } from "./functions/removeProductFromCart"
import { addProductToUserFavorites,removeProductFromUserFavorites } from "../../api/favoriteProduct";
// ROUTER
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
    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)
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
    // User Id from jwt
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }
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
                                                            const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                                            const id = product["id"]
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
                                                                                <img className="cart-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
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
                                                <button id="scroll-left-1" className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                            <div id="popular-cookies-snacks" className="popular-products-home">
                                                
                                                { 
                                                popularProducts?.map( (product) => {
                                                    {   
                                                        const imageFile = product["product_image_tag"]
                                                        const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                                        const id = product["id"]
                                                        return (
                                                            <div className="popular-product-item">
                                                                {
                                                                    favoritesIconChange.includes(product["id"]) === true
                                                                        ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-home-added">
                                                                                <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                                                                            </div>
                                                                        :    <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon-home">
                                                                                <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                                                                            </div>
                                                                }
                                                                <Link to={`/${formatedName}/${id}`}>
                                                                    <img className="home-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                                                </Link>
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
                                                <button id="scroll-right-1"  className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                        </div>
                                    </div>
                            
                            :   <div className="cart-page">
                                    
                                        <div className="cart-message-container">
                                            <div><img className="empty-cart-image" src={require(`../../images/empty-cart.webp`)}></img></div>
                                            <div className="no-products-incart-text">You haven't added a product yet</div>
                                        </div>
                                        <div className="popular-products-text">Check out this popular products.</div>
                                        <div className="popular-products-wraper">
                                            <div>
                                                <button id="scroll-left-1" className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                            <div id="popular-cookies-snacks" className="popular-products-home">
                                                
                                                { 
                                                popularProducts?.map( (product) => {
                                                    {   
                                                        const imageFile = product["product_image_tag"]
                                                        const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                                        const id = product["id"]
                                                        
                                                        return (
                                                            <div className="popular-product-item">
                                                                {
                                                                    favoritesIconChange.includes(product["id"]) === true
                                                                        ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-home-added">
                                                                                <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                                                                            </div>
                                                                        :    <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon-home">
                                                                                <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                                                                            </div>
                                                                }
                                                                <Link to={`/${formatedName}/${id}`}>
                                                                    <img className="home-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                                                </Link>
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
                                                <button id="scroll-right-1"  className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                            </div>
                                        </div>
                                    
                                </div>
                }               
                
            
            <Footer />
        </div>
        
    )
}

export default Cart