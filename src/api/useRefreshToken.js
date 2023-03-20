import { store } from "../state/store"
import { setJwtAccess, setJwtRefresh } from "../state/user/userSlices"

export const getNewAccessToken = async () => {
    
    const userCredentials = store.getState().userCredentialsReducer

    const response = await fetch(`http://127.0.0.1:8000/refresh_token/`, {
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

}


 
