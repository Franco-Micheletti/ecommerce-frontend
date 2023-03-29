import React from "react"
import { removeProductFromCart } from "../../cart/functions/removeProductFromCart"
import { addProductToCart } from "../../cart/functions/addProductToCart"

export const BasicInfo = ({productData,expandAddButton}) => {

    return (
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

                : <button onClick={ () => addProductToCart(productData["basic"])} className="product-detailed-page-add-button">
                    <div>Add</div>
                    </button>
            }
        </div> 
    )
}