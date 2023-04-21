import React,{useRef,useState,useEffect} from "react"
import { removeProductFromUserFavorites,addProductToUserFavorites} from "../../../api/favoriteProduct"
import { removeProductFromCart } from "../../cart/functions/removeProductFromCart"
import { addProductToCart } from "../../cart/functions/addProductToCart"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import jwt from "jwt-decode";
import { store } from "../../../state/store"
import { calculateScrolling } from "../functions/calculateScrolling"

export const ProductsAtHome = ({products,type}) => {

    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)
    // Get user id
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }
    // Refs
    const popularcookies = useRef()
    const popularEnergyDrinks = useRef()
    const popularLaptops = useRef()

    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    const handleScrollLeft = (container) => {
        container.current.scrollLeft -= calculateScrolling(screenWidth)
    }
    const handleScrollRight = (container) => {
        container.current.scrollLeft += calculateScrolling(screenWidth)
    }

    return (
        <div className="popular-products-wraper">
            <div>
                <button aria-label="scroll-left" id={`scroll-left-${type}`} onClick ={ () => handleScrollLeft(type === "cookies" ? popularcookies : type === "energy_drinks" ? popularEnergyDrinks : popularLaptops)} className="horizontal-scroll-left"><svg className="svg-scroll-icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
            </div>
            <div ref={type === "cookies" ? popularcookies : type === "energy_drinks" ? popularEnergyDrinks : popularLaptops } id="popular-cookies-snacks" className="popular-products-home">
                {   products
                        ?   products.map( (product,index) => {   
                                
                                const imageFile = product["product_image_tag"]
                                const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                const id = product["id"]
                                return (
                                    <div key={index} className="popular-product-item">
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
                                            <img alt="product-image-home" className="home-product-image" width={"176"} height={"176"} src={require(`../../../images/${imageFile}-1.webp`)}></img>
                                        </Link>
                                        {
                                        expandAddButton[product["id"]]
                                            ? <button style={{width: "150px" }} className="button-product-add-home">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                    <label>+</label>
                                                </div>
                                                </button> 
        
                                            : <button onClick={ () => addProductToCart(product)} className="button-product-add-home">
                                                <div>Add</div>
                                                </button>
                                        }
                                        <div className="product-price-search">${product['price']}</div>
                                        {   
                                            product['avg-score']
                                                ?   <div className="product-avg-score">
                                                        <div className="user-score">
                                                        {   
                                                            product['avg_score']["avg"] >= 1 && product['avg_score']["avg"] < 1.5
                                                                ? <span className="review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                                                :  product['avg_score']["avg"] >= 1.5 && product['avg_score']["avg"] < 2.5
                                                                        ? <span className="review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                                                        : product['avg_score']["avg"] >= 2.5 && product['avg_score']["avg"] < 3.5
                                                                            ? <span className="review-score">&#9734;&#9733;&#9733;&#9734;&#9734;</span>
                                                                            : product['avg_score']["avg"] >= 3.5 && product['avg_score']["avg"] < 4.5
                                                                                ? <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                                                : <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                                        }
                                                        </div>
                                                        <div style={{fontSize:"13px"}}>( {product["avg_score"]["total_reviews"]} )</div>
                                                    </div>
                                                :   <></>
                                        }
                                        
                                        <div className="popular-products-product-name">{product['product_name']}</div>
                                    </div>
                                    )
                                }
                            )

                        : <></>
                }
            </div>
            <div>
                <button aria-label="scroll-right" id={`scroll-right-${type}`} onClick ={ () => handleScrollRight(type === "cookies" ? popularcookies : type === "energy_drinks" ? popularEnergyDrinks : popularLaptops)} className="horizontal-scroll-right"><svg className="svg-scroll-icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
            </div>
        </div>
    )
}