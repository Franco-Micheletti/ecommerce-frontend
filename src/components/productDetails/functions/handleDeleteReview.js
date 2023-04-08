import { store } from "../../../state/store"
import { setReviewSubmitted } from "../../../state/reviews/reviewsSlices"
import { setUserAccountAllReviews } from "../../../state/reviews/reviewsSlices"
import { getAllReviewsOfUser } from "../../../api/getAllReviewsOfUser"

export const handleDeleteReview = async (review_id,user_id) => {

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

        const fetchData = async () => {
            const reviews = await getAllReviewsOfUser(user_id)
            store.dispatch(setUserAccountAllReviews(reviews))
        }
        fetchData()
        
}