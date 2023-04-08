import { store } from "../state/store"
import { setJwtAccess, setJwtRefresh } from "../state/user/userSlices"
import { getFavoritesProductsOfUser } from "./getFavoritesProductsOfUser"
import jwt from "jwt-decode"

export const getNewAccessToken = async () => {
    
    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }
    
    const userCredentials = store.getState().userCredentialsReducer

    const response = await fetch(`${url}/refresh_token/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "refresh":userCredentials["jwt_refresh"]
        }
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        }
    })

    store.dispatch(setJwtAccess(response["jwt_access"]))
    store.dispatch(setJwtRefresh(response["jwt_refresh"]))
    let id = jwt(response["jwt_access"])["user_id"]
    getFavoritesProductsOfUser(id)
}


 
