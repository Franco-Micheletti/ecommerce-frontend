import { addformError,resetFormErrors } from "../../../state/user/userSlices"
import { store } from "../../../state/store"

export const login = async ({username,password}) => {

    store.dispatch(resetFormErrors())

    const response = await fetch(`http://127.0.0.1:8000/login/`, {
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