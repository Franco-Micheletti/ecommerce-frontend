import React from "react"

export const UserReview = ({review}) => {

    return ( 
        
        <div className="user-review">
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
        </div>
    )
}