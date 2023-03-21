import { store } from "../state/store"
import { setUserData } from "../state/user/userSlices"

export const getUserData = async (access) => {
    
    const userData = await fetch(`http://127.0.0.1:8000/user/id=${access}`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    
    store.dispatch(setUserData(userData))
} 