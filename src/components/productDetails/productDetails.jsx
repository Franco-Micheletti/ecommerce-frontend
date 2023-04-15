// React / Components
import React,{useEffect} from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer";
// Api
import { fetchOneProduct } from "../../api/fetchOneProduct";
// Redux
import { useSelector,useDispatch } from "react-redux";
import { store } from "../../state/store";
import { setReviewSubmitted } from "../../state/reviews/reviewsSlices"
// Css
import '../../css/productDetails.css';
// Router
import { useParams } from "react-router-dom";
// Childs
import { ImagesPanel } from "./childComponents/imagesPanel";
import { BasicInfo } from "./childComponents/basicInfo";
import { VariantsPanel } from "./childComponents/variantsPanel";
import { ProductSpecifications } from "./childComponents/productSpecifications";
import { UserReview } from "./childComponents/userReview";
import { CreateReviewForm } from "./childComponents/createReviewForm";

export const ProductDetails = () => {

    let {productName,productId} = useParams()
    // State
    const productData          = useSelector((store) => store.specificProductReducer)
    const expandAddButton      = useSelector((store) => store.expandAddButtonListReducer)
    const reviewSubmitted      = useSelector((store) => store.reviewSubmittedReducer)
    const userCredentials      = useSelector( (store)=> store.userCredentialsReducer)
    // Hooks
    const dispatch = useDispatch()

    useEffect( () => {
        document.title = productName;
      }, []);

    useEffect(() => {
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: 'instant'
            }
        )
        if (productId) {
            fetchOneProduct(productId)
        }
    }, [productId])

    useEffect(()=> {

        if (reviewSubmitted === true) {
            fetchOneProduct(productId)
        
            window.scrollTo(
                {
                    top: 1600,
                    left: 0,
                    behavior: 'instant'
                }
            )
            dispatch(setReviewSubmitted(false))
        }
        
    },[reviewSubmitted])
    
    

    return (
        <div>
            <Navbar />
            { 
                productData
                    ?   <div className="product-page-container">
                            <div className="product-data-container">
                                
                                <ImagesPanel productData = {productData}/>

                                <div className="product-right-panel">
                                    
                                    <BasicInfo     productData = {productData} expandAddButton = {expandAddButton}/>
                                    <VariantsPanel productData = {productData} productName = {productName}/>

                                </div>
                            </div>
                            <div className="product-specifications">
                                <ProductSpecifications productData = {productData}/>
                            </div>
                            <div className="user-reviews-panel">

                                {/* Logged user's review */}

                                { 
                                    productData["logged_user_review"]
                                        ?   <div>
                                                <div id="loggedUserReview" className="reviews-title">Your review of this product</div>
                                                <div style={{marginLeft:"20px"}}>
                                                    <UserReview review={productData["logged_user_review"]}/>
                                                </div>
                                            </div>
                                        :   <></>
                                }
                                
                                {/* All the reviews of any other user except logged user */}

                                {
                                productData["reviews"]
                                    ?   <div style={{display:"inline-grid"}}>
                                            <div style={{display:"inline-grid"}}>
                                                <div className="reviews-title">Product's reviews</div>
                                                <div className="reviews-container">
                                                    {
                                                        productData["reviews"].map( (review) => {
                                                            
                                                            return (
                                                                <UserReview review={review}/>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {
                                                userCredentials["jwt_access"]

                                                    ?  productData["logged_user_review"]
                                                            ?   <label className="existing-review-message">Delete your existing review or edit it if you have changed your mind!</label>

                                                            :   <div>
                                                                    <div className="review-login-check-text">Write a review for this product!</div>
                                                                    <CreateReviewForm productData={productData}/>
                                                                </div>
                                                    
                                                        
                                                    :   <div className="review-login-check-text">Log in to write a review for this product!</div>
                                            }
                                            
                                        </div>
                                    :   <div className="text-no-review">
                                            {
                                                productData["logged_user_review"]
                                                   ? <></>
                                                   : <div className="review-login-check-text">This is too quiet.</div>
                                            } 
                                            
                                            {
                                            userCredentials["jwt_access"]
                                                ?   productData["logged_user_review"]
                                                        ?   <label className="existing-review-message">Delete your existing review or edit it if you have changed your mind!</label>
                                                        :   <div> 
                                                                <div className="review-login-check-text">Break the silence and write a review for this product!</div>
                                                                <CreateReviewForm productData={productData}/>
                                                            </div>
                                                :   <div className="review-login-check-text">Log in to write a review for this product!</div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    : <></>
                    
            }
            <Footer />
        </div>
    )
}