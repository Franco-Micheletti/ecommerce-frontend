import { setProduct } from "../state/specificProduct/productsSlices"
import { setVariantOption } from "../state/variants/variantsSlices"
import { store } from "../state/store"

export const getAllReviewsOfUser = async () => {

    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }
    
    const response = await fetch(`${url}/reviews/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.status === 200 ) {
                return response.json()
            } 
        }
    )
    .then(reviews => {
            return reviews
        }
    )

    return response

} 