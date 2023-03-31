import React,{useEffect,useRef,useState}from "react"
import { useSelector,useDispatch } from "react-redux"
import jwt from 'jwt-decode'
import { getUserData } from "../../../api/getUserData";
import { store } from "../../../state/store";
import { handleDeleteReview } from "../functions/handleDeleteReview";
import { UpdateReviewForm } from "./updateReviewForm";
import { setReviewScore, setReviewText} from "../../../state/specificProduct/productsSlices"

export const UserReview = ({review}) => {

    const userData        = useSelector((store) => store.userDataReducer)
    const reviewSubmitted = useSelector((store) => store.reviewSubmittedReducer)
    const [updateReview,setUpdateReview] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        
        const userCredentials = store.getState().userCredentialsReducer
        if (Object.keys(userCredentials).length > 0 && Object.keys(userData).length === 0) {
            let id = jwt(userCredentials["jwt_access"])["user_id"]
            getUserData(id)
        }
    }, [])

    useEffect(()=>{

        if (updateReview === true) {
            dispatch(setReviewScore(review["score"]))
            dispatch(setReviewText(review["text"]))
        }
    },[updateReview])



    return ( 
        
        <div className="user-review">

            {
                updateReview
                    ? <UpdateReviewForm reviewId={review["id"]} reviewText={review["text"]} reviewScore={review["score"]}/>
                    
                    :   <div>
                            <div className="review-user-info-container">
                                <img className="user-profile-image" src={require(`../../../images/${review["user"]["profile_image_tag"]}.webp`)}></img>
                                {review["user"]["username"]}
                                <div className="review-date">{review["date"]}</div>
                            </div>
                            {   
                                review["score"] === 1 
                                    ? <span className="review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                    :  review["score"] === 2
                                            ? <span className="review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                            : review["score"] === 3
                                                ? <span className="review-score">&#9734;&#9733;&#9733;&#9734;&#9734;</span>
                                                : review["score"] === 4
                                                    ? <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                    : <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            }
                            <div className="review-text">{review["text"]}</div>
                                {
                                    userData["id"] === review["user"]["id"]
                                        ?   <div className="review-logged-options">
                                                <button onClick={() => setUpdateReview(true) }>Edit</button> <button onClick={() => handleDeleteReview(review["id"])} >Delete</button>
                                            </div>
                                        :   <></>
                                }
                        </div>

            }
        </div>
        
    )
}