import { store } from "../../../state/store"
import { setReviewSubmitted } from "../../../state/reviews/reviewsSlices"
import { setReviewError } from "../../../state/reviews/reviewsSlices";

export const handleUpdateReview = async (e,review_id) => {

        e.preventDefault()

        const reviewData = store.getState().reviewFormDataReducer
        
        const response = await fetch(`http://127.0.0.1:8000/product/review/review_id=${review_id}`, {
            method: 'PUT',
            credentials:'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text":reviewData["text"],
                                  "score":reviewData["score"]})
        }).then((response)=>{
            if (response.status === 200) {
                store.dispatch(setReviewSubmitted(true))
                store.dispatch(setUpdateReview(false))
                return response.json()
            } else {
                return response.json()
            }
        })
        
        if ( response["error"]) {
            store.dispatch(setReviewError(response["error"]))
        }

        
        
}