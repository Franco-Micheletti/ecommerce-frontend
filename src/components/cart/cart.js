import React, { useEffect, useState } from "react"
// COMPONENTS
import Footer from "../footer"
import Navbar from "../navbar/navbar"
import { ListOfPopularProducts } from "./childComponents/listOfPopularProducts";
// CSS
import '../../css/cart.css'
// REDUX 
import { useSelector,useDispatch } from "react-redux"
import { fetchPopularProducts } from "../../api/fetchPopularProducts"
// FUNCTIONS
import { addProductToCart} from "../cart/functions/addProductToCart";
import { removeProductFromCart } from "./functions/removeProductFromCart"
// ROUTER
import { Link } from "react-router-dom"
// MERCADO PAGO
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { checkOutMercadoPago } from "../../api/checkOutMercadoPago";

initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY);

const Cart = () => {

    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    // Get products in cart
    const productsInCart = useSelector( (store) => store.cartListReducer)
    // Redux
    const [ showOtherPaymentMethods,setShowOtherPaymentMethods ] = useState(false)
    const [ mercadoPagoPreference,setmercadoPagoPreference ]     = useState(null)
    const dispatch = useDispatch()
    const numberOfproductsInCart = useSelector( (store) => store.cartCounterReducer)
    const popularProducts = useSelector( (store) => store.popularProductsForCartReducer)
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
    
    
    useEffect( () => {
        fetchPopularProducts()
    },[])

    const handleShowOtherPaymentMethods = () => {
        
        if (showOtherPaymentMethods === true) {
            setShowOtherPaymentMethods(false)
        } else {
            
            // Create items list for mercado pago
            const itemList = []
            productsInCart.map( (product) => {
                itemList.push(
                    {
                        "title":product["product_name"],
                        "quantity":product["quantity"],
                        "unit_price":product["price"]
                    }
                )
            })

            const generateMercadoPagoLink = async () => {
                const preference = await checkOutMercadoPago(itemList)
                setmercadoPagoPreference(preference)
            }
            generateMercadoPagoLink()
            setShowOtherPaymentMethods(true)
        }
    }

    return(
        <div>
            <Navbar />
                {
                    numberOfproductsInCart > 0
                            ?       <div className="cart-page">
                                        <div className="products-payment-container">
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
                                                                        <div key={index} className="product-info-item-cart">
                                                                            <div className="product-data-container-cart">
                                                                                <Link to={`/${formatedName}/${id}`}>
                                                                                    <div className="product-name-image-container">
                                                                                        <img className="cart-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                                                                        {   
                                                                                            screenWidth < 609
                                                                                                ? product["product_name"].length > 20
                                                                                                    ? <label className="cart-product-name">{product['product_name'].slice(0,20)}...</label>
                                                                                                    : <label className="cart-product-name">{product['product_name']}</label>
                                                                                                :  screenWidth < 1300
                                                                                                    ?   <label className="cart-product-name">{product['product_name'].slice(0,50)}...</label>
                                                                                                    :   <label className="cart-product-name">{product['product_name'].slice(0,120)}...</label>
                                                                                                    
                                                                                        }
                                                                                    </div>
                                                                                    <label className="cart-product-quantity">{product['quantity']}</label>
                                                                                    <label className="unit-price-cart"> ${product['price'].toFixed(2)}</label>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="product-options-cart-container">
                                                                                <div onClick={() => removeProductFromCart(product["id"])} className="remove-product-from-cart-button-container">
                                                                                    <div className="product-options-cart-text">Remove</div>
                                                                                </div>
                                                                                <div onClick={ () => addProductToCart(product)} className="add-product-from-cart-button-container">
                                                                                    <div  className="product-options-cart-text">Add More</div>
                                                                                </div>
                                                                                <div className="details-product-from-cart-button-container">
                                                                                    <Link to={`/${formatedName}/${id}`}>
                                                                                        <div className="product-options-cart-text">Product Details</div>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="total-price-in-cart">Total:<label> ${totalPrice.toFixed(2)}</label></div>
                                            </div>
                                            <div className="cart-checkout">
                                                <div className="cart-checkout-title">Checkout</div>
                                                <div className="payment-method-container">
                                                    <div className="payment-method-wrapper">
                                                        <div className="payment-method-title">Payment Methods</div>
                                                        <div className="payment-method-options-container">
                                                            <div className="payment-method-option">Debit/Credit Card</div>
                                                            <div className="payment-method-option"onClick={handleShowOtherPaymentMethods}>Other</div>
                                                        </div>
                                                        {
                                                        showOtherPaymentMethods
                                                            ?   mercadoPagoPreference
                                                                    ?   <div id="wallet_container">
                                                                            <Wallet initialization={{ preferenceId: mercadoPagoPreference["id"] }} />
                                                                        </div>

                                                                    :   <></>
                                                            :   <></>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="cart-checkout-pay-button-container">
                                                    <div>
                                                        <button className="cart-checkout-pay-button">Pay</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popular-products-text">Some products you might like!</div>
                                        <ListOfPopularProducts popularProducts={popularProducts}/>
                                    </div>
                            
                            :   <div className="cart-page">
                                    <div className="cart-message-container">
                                        <div><img className="empty-cart-image" src={require(`../../images/empty-cart.webp`)}></img></div>
                                        <div className="no-products-incart-text">You haven't added a product yet</div>
                                    </div>
                                    <div className="popular-products-text">Check out this popular products.</div>
                                    <ListOfPopularProducts popularProducts={popularProducts}/>
                                </div>
                }               
                
            
            <Footer />
        </div>
        
    )
}

export default Cart