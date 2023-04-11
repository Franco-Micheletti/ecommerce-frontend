import React,{useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviewsOfUser } from "../../../api/getAllReviewsOfUser"
import { useState } from "react"
import { Link } from "react-router-dom"
import { setUserAccountAllReviews } from "../../../state/reviews/reviewsSlices"
import { store } from "../../../state/store"

export const Myreviews = (user_id)=> {

    const dispatch = useDispatch()
    const allReviews = useSelector((store) => store.userAccountAllReviewsReducer)
    const [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)

    useEffect( () => {

        
        const fetchData = async () => {
            const reviews = await getAllReviewsOfUser(user_id)
            dispatch(setUserAccountAllReviews(reviews))
        }
        if (allReviews.length === 0) {
            fetchData()
        }

    }, [])
    

    return (

        <div className="account-info-page"> 
            <div className="user-account-reviews">
                
                {
                    allReviews
                        ?   allReviews.length > 0
                            
                                ?   allReviews.map((review) => {

                                    const imageFile    = review["product"]["product_image_tag"]
                                    const productId    = review["product"]["id"]
                                    const formatedName = review["product"]["product_name"].replaceAll(" ","-").toLowerCase()
                                    const reviewText   = review["text"]
                                    const date         = review["date"].split("-").reverse().join("/")
                                    return(
                                        <div className="user-account-review-item">
                                            {
                                                <div className="user-account-review-info">
                                                    <Link to={`/${formatedName}/${productId}`}>
                                                        <img className="all-reviews-product-image" src={require(`../../../images/${imageFile}-1.webp`)}></img>
                                                    </Link>
                                                    <div className="user-account-review-right-panel">
                                                        {   
                                                            screenWidth < 609
                                                                ? review["product"]["product_name"].length > 60
                                                                    ? <label className="all-reviews-product-name">{review["product"]['product_name'].slice(0,60)}...</label>
                                                                    : <label className="all-reviews-product-name">{review["product"]['product_name']}</label>
                                                                :  screenWidth > 609 && screenWidth < 1300
                                                                    ?   <label className="all-reviews-product-name">{review["product"]['product_name'].slice(0,90)}...</label>
                                                                    :   <label className="all-reviews-product-name">{review["product"]['product_name']}</label>
                                                                    
                                                        }
                                                        
                                                        <div className="user-account-review-wrapper">
                                                            <div>{date}</div>
                                                            {   
                                                                review["score"] === 1 
                                                                    ? <span className="user-account-review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                                                    :  review["score"] === 2
                                                                        ? <span className="user-account-review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                                                        : review["score"] === 3
                                                                            ? <span className="user-account-review-score">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
                                                                            : review["score"] === 4
                                                                                ? <span className="user-account-review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                                                : <span className="user-account-review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                                            }
                                                            <div className="user-account-review-text">"{reviewText}"</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            }
                                        </div>
                                    )
                                    })

                                :   <div> No reviews </div>
                                
                        :   <div> No reviews </div>
                    
                }
            </div>
        </div>
    )
}