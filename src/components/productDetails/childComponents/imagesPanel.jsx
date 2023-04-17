import React,{useEffect,useState,useRef} from "react"
import { useSelector,useDispatch } from "react-redux"
import { store } from "../../../state/store"
import { setBigImage,setTempBigImage } from "../../../state/specificProduct/productsSlices"

export const ImagesPanel = ({productData}) => {

    const bigImage             = useSelector((store) => store.bigImageReducer)
    const bigImageElement      = useRef()
    const bigImageContainer    = useRef()
    const smallImagesContainer = useRef()
    const dispatch             = useDispatch()

    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    // Create array for list of total images
    const imagesArray = []
    for (let i = 1; i < productData["basic"]["total_images"]+1; i++) {
        imagesArray.push(i)
    }

    const handleClickSmallImage = (e,smallImageDefault) => {
        console.log("clicked small image" )
        dispatch(setBigImage(smallImageDefault))
    }

    const handleMouseOver = (e,smallImage) => {
        e.target.style.borderBottom = "5px solid #0684dd"
        bigImageElement.current.src = require(`./../../../images/${smallImage}.webp`)
    }

    const handleMouseOut = (e) => {
        e.target.style.borderBottom = "5px solid transparent"
        bigImage
            ?   bigImageElement.current.src = require(`./../../../images/${bigImage}.webp`)
            :   bigImageElement.current.src = require(`./../../../images/${productData["basic"]["product_image_tag"]}-1.webp`)
        
    }

    const handleScrollUp = () => {
        
        smallImagesContainer.current.scrollTop -= 160
    }

    const handleScrollDown = () => {
        smallImagesContainer.current.scrollTop  += 160
    }

    const handleMouseMoveBigImage = (e) => {

        let screenX  = e.clientX - bigImageElement.current.offsetLeft
        let screenY  = e.clientY - bigImageElement.current.offsetTop

        let imageWidth  = bigImageElement.current.offsetWidth
        let imageHeight = bigImageElement.current.offsetHeight

        let transformX  = screenX / imageWidth  * 100
        let transformY  = screenY / imageHeight * 100
        
        bigImageElement.current.style.transform       = `scale(3)`
        bigImageContainer.current.style.border        = "0.5px solid #aaaaaa"
        bigImageElement.current.style.transformOrigin = `${transformX}% ${transformY}%`
        
    }
    const handleMouseOutBigImage = () => {

        bigImageElement.current.style.transform = "translate(0%,0%) scale(1)"
        bigImageContainer.current.style.border  = "0.5px solid transparent"
        bigImageElement.current.style.width     = "100%"
    }

    // const handleScrollLeft = (container) => {
    //     container.current.scrollLeft -= 226
        
    // }
    // const handleScrollRight = (container) => {
    //     container.current.scrollLeft += 226
    // }

    return (
        
        screenWidth > 1070

        ?   <div className="product-images-panel">
                <div>
                    <div className="button-scroll-up-container">
                        <button onClick={() => handleScrollUp()} id="scroll-up" className="scroll-up"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div ref={smallImagesContainer} className="small-images-container">
                        {
                            imagesArray.map( (number) => {

                                return (
                                    <img key={number} 
                                         onClick={(e) => handleClickSmallImage(e,`${productData["basic"]["product_image_tag"]}-${number}`)}
                                         onMouseOver = {(e) => handleMouseOver(e,`${productData["basic"]["product_image_tag"]}-${number}`)}
                                         onMouseOut  = {(e) => handleMouseOut(e)}  
                                         className="product-image-small" 
                                         src={require(`././../../../images/${productData["basic"]["product_image_tag"]}-${number}.webp`)}>
                                    </img>
                                )
                            } )
                        }
                    </div>
                    <div className="button-scroll-down-container">
                        <button onClick={() => handleScrollDown()} id="scroll-down" className="scroll-down"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <div ref={bigImageContainer} className="big-image-container">
                    {
                        bigImage
                            ?   <img onMouseLeave={handleMouseOutBigImage} onMouseMove={(e) => handleMouseMoveBigImage(e)} ref={bigImageElement} className="product-image-big" src={require(`./../../../images/${bigImage}.webp`)}></img>
                            :   <img onMouseLeave={handleMouseOutBigImage} onMouseMove={(e) => handleMouseMoveBigImage(e)} ref={bigImageElement} className="product-image-big" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}-1.webp`)}></img>
                    }
                </div>
            </div>

        :   <div className="product-images-panel">
                <div ref={bigImageContainer} className="big-image-container">
                {
                    bigImage
                        ?   <img onMouseLeave={handleMouseOutBigImage} onMouseMove={(e) => handleMouseMoveBigImage(e)} ref={bigImageElement} className="product-image-big" src={require(`./../../../images/${bigImage}.webp`)}></img>
                        :   <img onMouseLeave={handleMouseOutBigImage} onMouseMove={(e) => handleMouseMoveBigImage(e)} ref={bigImageElement} className="product-image-big" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}-1.webp`)}></img>
                }
                </div>
                <div  className="small-images-panel">
                    <div className="button-scroll-left-container">
                        <button onClick={() => {smallImagesContainer.current.scrollLeft -= 200}} id="scroll-left" className="scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div ref={smallImagesContainer} className="small-images-container">
                        {
                            imagesArray.map( (number) => {

                                return (
                                    <img onClick={(e) => handleClickSmallImage(e,`${productData["basic"]["product_image_tag"]}-${number}`)} 
                                         className="product-image-small" 
                                         src={require(`././../../../images/${productData["basic"]["product_image_tag"]}-${number}.webp`)}>
                                    </img>
                                )
                            } )
                        }
                    </div>
                    <div className="button-scroll-right-container">
                    <button onClick={() => {smallImagesContainer.current.scrollLeft += 50}} id="scroll-right" className="scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                </div>
                </div>
            </div>
            
    )
}