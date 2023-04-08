import React from "react"
import jwt from "jwt-decode";
import { useSelector,useDispatch } from "react-redux";
import { store } from "../../../state/store";
// FUNCTIONS
import { removeProductFromCart } from "../../cart/functions/removeProductFromCart"
import { addProductToCart } from "../../cart/functions/addProductToCart"
import { addProductToUserFavorites,removeProductFromUserFavorites } from "../../../api/favoriteProduct";

export const BasicInfo = ({productData,expandAddButton}) => {

    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }
    

    return (
        <div className="right-panel-basic">
            {
                favoritesIconChange.includes(productData["basic"]["id"]) === true
                    ?   <div style={{top: "-12px",right: "-94%",background:"none"}} onClick={() => removeProductFromUserFavorites(productData["basic"]["id"],userId)} className="to-favorite-icon-home-added">
                            <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                        </div>
                    :    <div  style={{top: "-12px",right: "-94%",background:"none"}} onClick={() => addProductToUserFavorites(productData["basic"]["id"],userId)} className="to-favorite-icon-home">
                            <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                        </div>
            }
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

                : <button onClick={ () => addProductToCart(productData["basic"])} className="product-detailed-page-add-button">
                    <div>Add</div>
                    </button>
            }
        </div> 
    )
}