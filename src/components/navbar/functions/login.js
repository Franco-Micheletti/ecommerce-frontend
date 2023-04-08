import { addformError,resetFormErrors } from "../../../state/user/userSlices"
import { store } from "../../../state/store"

export const login = async ({username,password}) => {

    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    store.dispatch(resetFormErrors())

    const response = await fetch(`${url}/login/`, {
        method: 'POST',
        credentials:'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"username":username,
                              "password":password})
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        } else {
            return response.json()
        }
    })

    if (response["message"] !== "Login Successfully")
        store.dispatch(addformError(response["message"]))
    else {
        return response
    }
    
} 