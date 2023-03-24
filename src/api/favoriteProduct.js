import { store } from "../state/store"
import { setFavoritesIconChangeList,setFavoritesList } from "../state/favorites/favoritesSlices"

export const addProductToUserFavorites = async (productId,userId) => {

    const response = await fetch(`http://127.0.0.1:8000/product/favorites/user_id=${userId}&product_id=${productId}`, {
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

    

    const response = await fetch(`http://127.0.0.1:8000/product/favorites/user_id=${userId}&product_id=${productId}`, {
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