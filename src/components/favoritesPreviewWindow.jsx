import jwt from "jwt-decode"
import { Link } from "react-router-dom"
import { store } from "../state/store"
import { getFavoritesProductsOfUser } from "../api/getFavoritesProductsOfUser"
import { useEffect,useState } from "react"
import '../css/favorites.css'
import { useSelector,useDispatch } from "react-redux"
import { setShowFavoritesPreview } from "../state/favorites/favoritesSlices"
import { setConfigurationPanelState } from "../state/user/userSlices"

export const FavoritesPreviewWindow = () => {

    const favoriteProducts = useSelector( (store) => store.favoritesListReducer)
    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    const userCredentials = useSelector( (store) => store.userCredentialsReducer)
    let id = jwt(userCredentials["jwt_access"])["user_id"]
    const dispatch = useDispatch()
    
    const hideWindow = () => {
        dispatch(setShowFavoritesPreview(false))
    }

    setTimeout( ()=> {
        document.addEventListener("click",hideWindow,{once:true})
    },1)

    useEffect(() => {
        getFavoritesProductsOfUser(id)

        return () => {
            document.removeEventListener("click",hideWindow)
        }
    }, [])
    
    
    return (
        <div className="favorite-preview-window">

            <div className="favorite-preview-wraper">
                { 
                    favoriteProducts
                        ? favoriteProducts?.slice(0,5).map( (product) => {
                                return (
                                    
                                    <div className="favorite-product-item">
                                        <img className="favorite-product-image" src={require(`../images/${product["product_image_tag"]}-1.webp`)}></img>
                                        {   
                                        screenWidth < 480
                                            ? product["product_name"].length > 120
                                                ? <label className="favorite-product-name">{product['product_name'].slice(0,120)}...</label>
                                                : <label className="favorite-product-name">{product['product_name']}</label>
                                            : screenWidth < 609
                                                ? product["product_name"].length > 40
                                                    ? <label className="favorite-product-name">{product['product_name'].slice(0,40)}...</label>
                                                    : <label className="favorite-product-name">{product['product_name']}</label>
                                                :screenWidth < 800
                                                    ? product["product_name"].length > 65
                                                        ? <label className="favorite-product-name">{product['product_name'].slice(0,65)}...</label>
                                                        : <label className="favorite-product-name">{product['product_name']}</label>
                                                    : product["product_name"].length > 110
                                                        ? <label className="favorite-product-name">{product['product_name'].slice(0,110)}...</label>
                                                        : <label className="favorite-product-name">{product['product_name']}</label>
                                        }
                                        {/* <label className="unit-price-favorite"> ${product['price'].toFixed(2)}</label> */}
                                    </div>
                                )
                            })
                        :<></>
                }
                {
                    favoriteProducts.length > 0
                            ?   <Link onClick={ () => dispatch(setConfigurationPanelState("showFavorites"))} style={{textDecoration:"none"}} to={"/account"}>
                                    <div className="favorites-page-link">
                                        <div>Show more</div>
                                    </div>
                                </Link>
                            :  <div className="favorite-empty">Your list of favorite products is empty</div>
                    
                }
            </div>
        
        </div>
    )
}