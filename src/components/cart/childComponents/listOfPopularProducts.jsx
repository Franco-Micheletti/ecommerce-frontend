import React,{useRef} from "react"
import jwt from "jwt-decode";
import { removeProductFromUserFavorites,addProductToUserFavorites } from "../../../api/favoriteProduct"
import { removeProductFromCart } from "../functions/removeProductFromCart"
import { addProductToCart } from "../functions/addProductToCart"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { store } from "../../../state/store";

export const ListOfPopularProducts = ({popularProducts}) => {

    const popProdElement = useRef()
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)

    const handleScrollLeft = () => {
        popProdElement.current.scrollLeft -= 226
        
    }
    const handleScrollRight = () => {
        popProdElement.current.scrollLeft += 226
    }

    // User Id from jwt
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }

    return ( 
        <div className="popular-products-wraper">
            <div>
                <button onClick={handleScrollLeft} id="scroll-left-1" className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
            </div>
            <div ref={popProdElement} id="popular-cookies-snacks" className="popular-products-home">
                
                { 
                    popularProducts?.map( (product,index) => {
                        {   
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
                                        <img className="home-product-image" src={require(`../../../images/${imageFile}-1.webp`)}></img>
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
                <button onClick={handleScrollRight} id="scroll-right-1"  className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
            </div>
        </div>
    )
}