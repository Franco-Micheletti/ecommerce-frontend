import React,{useEffect,useRef,useState}from "react"
import { useSelector,useDispatch } from "react-redux"
import jwt from 'jwt-decode'
import { getUserData } from "../../../api/getUserData";
import { store } from "../../../state/store";
import { handleDeleteReview } from "../functions/handleDeleteReview";
import { UpdateReviewForm } from "./updateReviewForm";
import { setReviewScore, setReviewText} from "../../../state/specificProduct/productsSlices"
import { setUpdateReview } from "../../../state/reviews/reviewsSlices";

export const UserReview = ({review}) => {

    const userData      = useSelector((store) => store.userDataReducer)
    const updateReview  = useSelector((store) => store.updateReviewReducer)
    const userCredentials = store.getState().userCredentialsReducer
    const dispatch = useDispatch()

    useEffect(() => {
        
        if (Object.keys(userCredentials).length > 0 && Object.keys(userData).length === 0) {
            let id = jwt(userCredentials["jwt_access"])["user_id"]
            getUserData(id)
        }
    }, [userCredentials])

    useEffect(()=>{

        if (updateReview === true && userData["id"] === review["user"]["id"]) {
            dispatch(setReviewScore(review["score"]))
            dispatch(setReviewText(review["text"]))
        }
    },[updateReview])

    return ( 
        
        <div style={{boxShadow: updateReview ? "none" : "box-shadow: 0 1px 2px 1px #00000026"}} className="user-review">
            {   
                updateReview && userData["id"] === review["user"]["id"]
                    ? <UpdateReviewForm reviewId={review["id"]}/>
                    
                    :   <div>
                            <div className="review-user-info-container">
                                <img className="user-profile-image" src={require(`../../../images/${review["user"]["profile_image_tag"]}.webp`)}></img>
                                {review["user"]["username"]}
                                <div className="review-date">{review["date"].split("-").reverse().join("/")}</div>
                            </div>
                            {   
                                review["score"] === 1 
                                    ? <span className="review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                    :  review["score"] === 2
                                            ? <span className="review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                            : review["score"] === 3
                                                ? <span className="review-score">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
                                                : review["score"] === 4
                                                    ? <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                    : <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            }
                            <div className="review-text">{review["text"]}</div>
                                {
                                    userData["id"] === review["user"]["id"]
                                        ?   <div className="review-logged-options">
                                                <button onClick={() => dispatch(setUpdateReview(true)) }>Edit</button> <button onClick={() => handleDeleteReview(review["id"],review["user"]["id"])} >Delete</button>
                                            </div>
                                        :   <></>
                                }
                        </div>

            }
        </div>
        
    )
}