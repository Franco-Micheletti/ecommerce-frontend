import { store } from "../../../state/store"
import { setReviewSubmitted } from "../../../state/reviews/reviewsSlices"

export const handleSubmitReview = async (e,product_id) => {

        if (process.env.REACT_APP_PRODUCTION === 'true'){
            var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
        } else {
            var url = 'http://127.0.0.1:8000'
        }

        e.preventDefault()

        const reviewData = store.getState().reviewFormDataReducer
        
        const response = await fetch(`${url}/product/review/create/product_id=${product_id}`, {
            method: 'POST',
            credentials:'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text":reviewData["text"],
                                  "score":reviewData["score"]})
        }).then((response)=>{
            if (response.status === 200) {
                store.dispatch(setReviewSubmitted(true))
            } else {
                return response.json()
            }
        })

        
        
}