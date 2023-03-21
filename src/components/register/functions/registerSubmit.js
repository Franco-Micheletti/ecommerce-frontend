import { store } from "../../../state/store"
import { addformError,resetFormErrors } from "../../../state/user/userSlices"

export const handleRegisterSubmit = async (e) => {

    e.preventDefault()

    const registrationFormData = store.getState().registrationFormDataReducer
    store.dispatch(resetFormErrors())

    const response = await fetch(`http://127.0.0.1:8000/signup/`, {
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