import React,{useEffect} from "react"
import { useSelector } from "react-redux"
import { store } from "../../../state/store"
import jwt from "jwt-decode"
import { Link } from "react-router-dom"
import { removeProductFromUserFavorites } from "../../../api/favoriteProduct"

export const AllFavorites = () => {

    const favoriteProductsList = useSelector( (store) => store.favoritesListReducer)
    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width

    // Get user id 
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }

    return (

        <div className="account-info-page"> 
            {
                favoriteProductsList.length > 0
                    ?   <div className="all-favorites-container">
                        <div className="user-account-options-title">Favorite Products</div>
                            {
                                favoriteProductsList.map((product)=>{
                                    const imageFile    = product["product_image_tag"]
                                    const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                    const product_id   = product["id"]
                                    return (
                                        <div className="all-favorites-product-item">
                                                <div className="all-favorites-name-image">
                                                <Link to={`/${formatedName}/${product_id}`}>
                                                    <img className="all-favorites-product-image" src={require(`../../../images/${imageFile}-1.webp`)}></img>
                                                    {   
                                                        screenWidth < 609
                                                            ? product["product_name"].length > 20
                                                                ? <label className="all-favorites-product-name">{product['product_name'].slice(0,20)}...</label>
                                                                : <label className="all-favorites-product-name">{product['product_name']}</label>
                                                            :  screenWidth < 1300
                                                                ?   <label className="all-favorites-product-name">{product['product_name'].slice(0,50)}...</label>
                                                                :   <label className="all-favorites-product-name">{product['product_name']}</label>
                                                                
                                                    }
                                                </Link>
                                                </div>
                                            <div className="user-account-remove-favorite-container">
                                                <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="user-account-remove-favorite"> 
                                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"  /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    })
                            }
                        </div>



                    :   <div>Your list of favorites products is empty</div>
            
            
            
            }
            
        </div>
    )
}