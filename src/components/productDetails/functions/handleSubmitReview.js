import { store } from "../../../state/store"
import { setReviewSubmitted } from "../../../state/reviews/reviewsSlices"

export const handleSubmitReview = async (e,product_id) => {

        e.preventDefault()

        const reviewData = store.getState().userReviewReducer
        
        const response = await fetch(`http://127.0.0.1:8000/product/review/product_id=${product_id}`, {
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