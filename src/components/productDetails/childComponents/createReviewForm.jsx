import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { handleSubmitReview } from "../functions/handleSubmitReview";
import { setReviewScore, setReviewText} from "../../../state/specificProduct/productsSlices"

export const CreateReviewForm = ({productData}) => {

    const dispatch   = useDispatch()
    const reviewFormData = useSelector((store) => store.reviewFormDataReducer)

    return (
        <form onSubmit={(e) => handleSubmitReview(e,productData["basic"]["id"])} className="new-review-form">
        <select className="score-select" onChange={(e) => dispatch(setReviewScore(e.target.value))} value={reviewFormData["score"]} type={""}>
            <option value={""}>--Select score--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
        </select>
        <textarea onChange={(e) => dispatch(setReviewText(e.target.value))} value={reviewFormData["text"]} className="new-review-text-box" type={"text"}></textarea>
        <button type="submit" className="new-review-submit">Send</button>
        </form>
    )
}