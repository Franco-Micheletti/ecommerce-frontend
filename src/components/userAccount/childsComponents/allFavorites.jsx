import React,{useEffect} from "react"
import { useSelector } from "react-redux"
import { store } from "../../../state/store"
import jwt from "jwt-decode"
import { Link } from "react-router-dom"

export const AllFavorites = () => {

    const favoriteProductsList = useSelector( (store) => store.favoritesListReducer)
    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width

    return (

        <div className="account-info-page"> 
            {
                favoriteProductsList.length > 0
                    ?   <div className="all-favorites-container">
                            {
                                favoriteProductsList.map((product)=>{
                                    const imageFile    = product["product_image_tag"]
                                    const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                    const product_id   = product["id"]
                                    return (
                                        <div className="all-favorites-product-item">
                                            <Link to={`/${formatedName}/${product_id}`}>
                                                <div className="all-favorites-name-image">
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
                                                </div>
                                            </Link>
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