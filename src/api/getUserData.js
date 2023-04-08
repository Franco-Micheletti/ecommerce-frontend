import { store } from "../state/store"
import { setUserData } from "../state/user/userSlices"

export const getUserData = async (access) => {
    
    if (process.env.PRODUCTION === true){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }
    
    const userData = await fetch(`${url}/user/id=${access}`)
                    .then(response => {
                        if (response.status === 200 ) {
                            return response.json()
                        } else {
                            return response.json()
                        }
                        }
                    ).then(data =>{
                        store.dispatch(setUserData(data))
                    })
    
    
} 