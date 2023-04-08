import { setFavoritesIconChangeList } from "../../../state/favorites/favoritesSlices"
import { store } from "../../../state/store"
import { deleteUserCredentials,setRenderUserOptions, setUserData} from "../../../state/user/userSlices"

export const logout = async () => {
    
    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    const jsonObject = await fetch(`${url}/logout/`, {
        method: 'POST',
        credentials:'include',
        headers: {
            "Content-Type": "application/json"
        },
        
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        }
    })
    
    if (jsonObject["message"] === "Logout successfully") {
        store.dispatch(deleteUserCredentials())
        store.dispatch(setRenderUserOptions(false))
        store.dispatch(setUserData({}))
        store.dispatch(setFavoritesIconChangeList([]))
    }
    
} 