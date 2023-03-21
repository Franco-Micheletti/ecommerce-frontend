import { store } from "../../../state/store"
import { setRegistrationFormData } from "../../../state/user/userSlices"

export const handleInputChange = (e) => {
    const payload = {"name":e.target.id,
                     "value":e.target.value}
    store.dispatch(setRegistrationFormData(payload))
    
}