import { store } from "../../../state/store"
import { addformError,resetFormErrors } from "../../../state/user/userSlices"

export const handleRegisterSubmit = async (e) => {

    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    e.preventDefault()

    const registrationFormData = store.getState().registrationFormDataReducer
    store.dispatch(resetFormErrors())

    const response = await fetch(`${url}/signup/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(registrationFormData)
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        } else {
            return response.json()
        }
    })

    if ( response["message"] === "Register Successfully") {
        window.location.href = '/activate'
    } else {
        store.dispatch(addformError(response["message"]))
    }
    
}