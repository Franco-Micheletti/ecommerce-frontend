import React,{useEffect,useState} from "react"

export const ImagesPanel = ({productData}) => {

    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
      
    }, [])

    return (
        
        screenWidth > 650

        ?   <div className="product-images-panel">
                <div>
                    <div className="button-scroll-up-container">
                        <button id="scroll-up" className="scroll-up"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div className="small-images-container">
                        <img className="product-image-small" src={require(`././../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                    </div>
                    <div className="button-scroll-down-container">
                        <button id="scroll-down" className="scroll-down"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <img className="product-image-big" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
            </div>

        :   <div className="product-images-panel">
                <img className="product-image-big" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                <div className="small-images-panel">
                    <div className="button-scroll-left-container">
                        <button id="scroll-left" className="scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div className="small-images-container">
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                        <img className="product-image-small" src={require(`./../../../images/${productData["basic"]["product_image_tag"]}.webp`)}></img>
                    </div>
                    <div className="button-scroll-right-container">
                        <button id="scroll-right" className="scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
            </div>
            
    )
}