// React / Components
import React,{useEffect, useState} from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer";
// Api
import { fetchOneProduct } from "../../api/fetchOneProduct";
// Redux
import { useSelector,useDispatch } from "react-redux";
import { updateVariantOption,setVariantValuePreview } from "../../state/variants/variantsSlices";
import { setReviewScore, setReviewText } from "../../state/specificProduct/productsSlices";
import { store } from "../../state/store";
// Css
import '../../css/productDetails.css';
// Functions
import { removeProductFromCart } from "../cart/functions/removeProductFromCart";
import { addProductToCart } from "../cart/functions/addProductToCart";
import { getProductVariantId } from "./functions/getProductVariantId";
import { handleSubmitReview } from "./functions/handleSubmitReview";
// Router
import { useParams,useNavigate } from "react-router-dom";

export const ProductDetails = () => {

    let {productName,productId} = useParams()
    // State
    const productData          = useSelector((store) => store.specificProductReducer)
    const expandAddButton      = useSelector((store) => store.expandAddButtonListReducer)
    const variantOptions       = useSelector((store) => store.variantOptionsReducer)
    const variantValuePreview  = useSelector((store) => store.variantOptionsReducer)
    const reviewText           = useSelector((store) => store.userReviewReducer)
    const reviewSubmitted      = useSelector((store) => store.reviewSubmittedReducer)
    const userCredentials       = useSelector( (store)=> store.userCredentialsReducer)
    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    // Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
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
        window.scrollTo(
            {
                top: 1600,
                left: 0,
                behavior: 'instant'
            }
        )
    },[reviewSubmitted])
    
    const handleUpdateVariantOption = (property,value) => {

        const newVariantOption = {"property":property,
                                  "value":value}
        dispatch(updateVariantOption(newVariantOption))
        const variantOptionsUpdated = store.getState().variantOptionsReducer
        const productVariantId = getProductVariantId(productData,variantOptionsUpdated)
        navigate(`/${productName}/${productVariantId}`)
    }

    const handleMouseOverVariantValue = (property,value) => {
        const payloadValuePreview = {"property":property,"value":value}
        dispatch(setVariantValuePreview(payloadValuePreview))
        
    }
    return (
        <div>
            <Navbar />
            { 
                productData
                    
                    ?   <div className="product-page-container">
                            <div className="product-data-container">
                                {
                                    screenWidth > 650

                                        ?   <div className="product-images-panel">
                                                <div>
                                                    <div className="button-scroll-up-container">
                                                        <button id="scroll-up" className="scroll-up"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                                    </div>
                                                    <div className="small-images-container">
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                    </div>
                                                    <div className="button-scroll-down-container">
                                                        <button id="scroll-down" className="scroll-down"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                                    </div>
                                                </div>
                                                <img className="product-image-big" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                            </div>

                                        :   <div className="product-images-panel">
                                                <img className="product-image-big" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                <div className="small-images-panel">
                                                    <div className="button-scroll-left-container">
                                                        <button id="scroll-left" className="scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                                    </div>
                                                    <div className="small-images-container">
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                        <img className="product-image-small" src={require(`../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                                                    </div>
                                                    <div className="button-scroll-right-container">
                                                        <button id="scroll-right" className="scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                                                    </div>
                                                </div>
                                            </div>
                                }
                               
                                <div className="product-right-panel">
                                    <div className="right-panel-basic">
                                        <label className="brand-name">{productData["basic"]["brand"]["brand_name"]}</label>
                                        <label className="product-details-name">{productData["basic"]["product_name"]}</label>
                                        <div className="user-score">
                                            <div className="star-fill"></div>
                                        </div>
                                        <label className="product-details-price">$ {productData["basic"]["price"]}</label>
                                        {
                                        expandAddButton[productData["basic"]["id"]]
                                            ? <button style={{width: "140px",gap:"20px"}} className="product-detailed-page-add-button">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(productData["basic"]["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[productData["basic"]["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(productData["basic"])}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(productData["basic"])} className="product-detailed-page-add-button">
                                                <div>Add</div>
                                                </button>
                                        }
                                    </div>
                                    {
                                        productData["variant_options"]
                                            ?   <div className="right-panel-variants">
                                                    {   
                                                        Object.keys(productData["variant_options"]).map( (property,index) => {
                                                            return(
                                                                <div className="variants-options-container">
                                                                    <div className="variant-text-preview-container">
                                                                        <div className="variant-property-text">{property[0].toUpperCase()+property.slice(1)}:</div> 
                                                                        <div className="variant-value-text">{variantValuePreview[property].toString().toLowerCase()}</div>
                                                                    </div>
                                                                    <div className="variant-values-list-container">
                                                                        {
                                                                            productData["variant_options"][property].map( (value) => {
                                                                                if (property === "color"){
                                                                                    return (
                                                                                        <div onMouseOver={ () => handleMouseOverVariantValue(property,value)} onClick={()=> handleUpdateVariantOption(property,value)} style={{backgroundColor: value}} className="color-variant-item"></div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <div onMouseOver={() => handleMouseOverVariantValue(property,value)} onClick={()=> handleUpdateVariantOption(property,value)} className="width-variant-item">{value}"</div>
                                                                                    )
                                                                                }
                                                                                
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            : <></>
                                    }
                                </div>
                            </div>
                            <div className="product-all-info">
                                <div className="product-all-info-title">Product Details</div>
                                {
                                    Object.keys(productData["properties"]).map( (nameParameter,index) => {
                                        
                                        const name = nameParameter.charAt(0).toUpperCase() + nameParameter.slice(1).replaceAll("_"," ")
                                        const value = productData["properties"][nameParameter]
                                        return (
                                        <div className="product-property-item">
                                            <div className="product-property-name">{name}</div>
                                            <div className="product-property-value">{value}</div>
                                        </div>
                                        )
                                    })
                                }
                                <div>
                                
                                </div>
                            </div>
                            <div className="user-reviews-panel">
                               { 
                                productData["logged_user_review"]

                                    ?   <div>
                                            <div className="reviews-title">Your review of this product</div>
                                            <div className="user-review">

                                                <div className="review-user-info-container">
                                                    <img className="user-profile-image" src={require(`../../images/${productData["logged_user_review"]["user"]["profile_image_tag"]}.webp`)}></img>
                                                    {productData["logged_user_review"]["user"]["username"]}
                                                    <div className="review-date">{productData["logged_user_review"]["date"]}</div>
                                                </div>
                                                {   
                                                    productData["logged_user_review"]["score"] === 1 
                                                        ? <span className="review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                                        :  productData["logged_user_review"]["score"] === 2
                                                                ? <span className="review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                                                : productData["logged_user_review"]["score"] === 3
                                                                    ? <span className="review-score">&#9734;&#9733;&#9733;&#9734;&#9734;</span>
                                                                    : productData["logged_user_review"]["score"] === 4
                                                                        ? <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                                        : <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                                }
                                                <div className="review-text">{productData["logged_user_review"]["text"]}</div>
                                                
                                            </div>
                                        </div>
                                        
                                    :   <></>
                                }
                                
                                {
                                    productData["reviews"]
                                        
                                        ?   <div style={{display:"inline-grid"}}>
                                                <div className="reviews-title">Product's reviews</div>
                                                <div className="reviews-container">
                                                {
                                                    productData["reviews"].map( (review) => {
                                                        
                                                        return (
                                                            <div className="user-review">

                                                                <div className="review-user-info-container">
                                                                    <img className="user-profile-image" src={require(`../../images/${review["user"]["profile_image_tag"]}.webp`)}></img>
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
                                                    })
                                                }
                                                </div>
                                                <div className="text-no-review"> 
                                                    <label style={{marginTop:"20px"}}>Write a review for this product!</label>
                                                    <form onSubmit={(e) => handleSubmitReview(e,productData["basic"]["id"])} className="new-review-form">
                                                        <select className="score-select" onChange={(e) => dispatch(setReviewScore(e.target.value))} value={reviewText["score"]} type={""}>
                                                            <option value={""}>--Select score--</option>
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                        </select>
                                                        <textarea onChange={(e) => dispatch(setReviewText(e.target.value))} value={reviewText["text"]} className="new-review-text-box" type={"text"}></textarea>
                                                        <button type="submit" className="new-review-submit">Send</button>
                                                    </form>
                                                </div>
                                            </div>
                                        :   userCredentials["jwt_access"] && productData["logged_user_review"] === null
                                                ?   productData["logged_user_review"] === null
                                                        :   <div className="text-no-review"> 
                                                                <label>This is too quiet.</label>
                                                                <label>Break the silence and write a review for this product!</label>
                                                                <form onSubmit={(e) => handleSubmitReview(e,productData["basic"]["id"])} className="new-review-form">
                                                                    <select className="score-select" onChange={(e) => dispatch(setReviewScore(e.target.value))} value={reviewText["score"]} type={""}>
                                                                        <option value={""}>--Select score--</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                    </select>
                                                                    <textarea onChange={(e) => dispatch(setReviewText(e.target.value))} value={reviewText["text"]} className="new-review-text-box" type={"text"}></textarea>
                                                                    <button type="submit" className="new-review-submit">Send</button>
                                                                </form>
                                                            </div>
                                                        ? <label className="existing-review-message">Delete your existing review or edit it if you have changed your mind!</label>

                                                :   <div className="text-no-review"> 
                                                        <label>This is too quiet.</label>
                                                        <label>Log in to write a review for this product!</label>
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