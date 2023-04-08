import { store } from "../state/store"
import { setFavoritesIconChangeList,setFavoritesList } from "../state/favorites/favoritesSlices"


export const addProductToUserFavorites = async (productId,userId) => {
    
    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    const response = await fetch(`${url}/product/favorites/user_id=${userId}&product_id=${productId}`, {
        method: 'POST',
        credentials:'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        } else {
            return response.json()
        }
    })
    
    store.dispatch(setFavoritesList(response["favorite_products_data"]))
    store.dispatch(setFavoritesIconChangeList(response["icon_change_list"]))
} 

export const removeProductFromUserFavorites = async (productId,userId) => {

    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    const response = await fetch(`${url}/product/favorites/user_id=${userId}&product_id=${productId}`, {
        method: 'DELETE',
        credentials:'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        } else {
            return response.json()
        }
    })

    store.dispatch(setFavoritesList(response["favorite_products_data"]))
    store.dispatch(setFavoritesIconChangeList(response["icon_change_list"]))
}