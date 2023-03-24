import { store } from "../state/store"
import { setFavoritesList,setFavoritesIconChangeList } from "../state/favorites/favoritesSlices"

export const getFavoritesProductsOfUser = async (user_id) => {

    const response = await fetch(`http://127.0.0.1:8000/products/favorites/user_id=${user_id}`, {
        method: 'GET',
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