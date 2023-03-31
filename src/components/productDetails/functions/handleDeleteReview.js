import { store } from "../../../state/store"
import { setReviewSubmitted } from "../../../state/reviews/reviewsSlices"

export const handleDeleteReview = async (review_id) => {

        const response = await fetch(`http://127.0.0.1:8000/product/review/review_id=${review_id}`, {
            method: 'DELETE',
            credentials:'include',
            headers: {
                "Content-Type": "application/json"
            },
           
        }).then((response)=>{
            if (response.status === 200) {
                store.dispatch(setReviewSubmitted(true))
            } else {
                return response.json()
            }
        })
}