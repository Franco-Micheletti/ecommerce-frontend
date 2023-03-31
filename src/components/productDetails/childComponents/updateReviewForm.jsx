import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { handleUpdateReview } from "../functions/handleUpdateReview";
import { setReviewScore, setReviewText} from "../../../state/specificProduct/productsSlices"
import { useEffect } from "react";

export const UpdateReviewForm = ({reviewId,reviewText,reviewScore}) => {

    const dispatch = useDispatch()

    const reviewFormData  = useSelector((store) => store.reviewFormDataReducer)
    const reviewFormError = useSelector((store) => store.reviewErrorReducer)
    
    return (
        <form onSubmit={(e) => handleUpdateReview(e,reviewId)} className="new-review-form">
        <select className="score-select" onChange={(e) => dispatch(setReviewScore(e.target.value))} value={reviewFormData["score"]} type={""}>
            <option value={""}>--Select score--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
        </select>
        {   
            reviewFormError
                ?   <div className="review-form-errors">{reviewFormError}</div>
                :   <></>

        }
        <textarea onChange={(e) => dispatch(setReviewText(e.target.value))} value={reviewFormData["text"]} className="update-review-text-box" type={""}></textarea>
        <button type="submit" className="new-review-submit">Save</button>
        </form>
    )
}