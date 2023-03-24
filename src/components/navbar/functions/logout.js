import { setFavoritesIconChangeList } from "../../../state/favorites/favoritesSlices"
import { store } from "../../../state/store"
import { deleteUserCredentials,setRenderUserOptions, setUserData} from "../../../state/user/userSlices"

export const logout = async () => {
    
    const jsonObject = await fetch(`http://127.0.0.1:8000/logout/`, {
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