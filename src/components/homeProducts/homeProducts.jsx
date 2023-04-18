import React,{useEffect,useRef,useState} from "react";
// CSS IMPORTS
import '../../css/products.css'
import '../../css/home.css'
import '../../css/skeleton.css'
// REDUX
import { useSelector } from "react-redux";
// API
import { fetchHomeProducts } from "../../api/fetchHomeProducts";
// COMPONENTS
import { TemplateSkeletonHome } from "../templateSkeletonHome"
import { ProductsAtHome } from "./childComponents/productsAtHome";
import { NavigateProductTypes } from "./childComponents/navigateProductTypes";

const HomeProducts = () => {
    
    // States
    const products   = useSelector( (store) => store.homeProductsReducer)
    const [imageCarousel,setImageCarousel] = useState("kitchen")
    const carouselHome  = useRef()
    const groceriesCard = useRef()

    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    useEffect( () => {
        document.title = "Codename: Market";
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: 'instant'
            }
        )
        // fetchAllProducts to show at home or different categories of popular products
        fetchHomeProducts()
    },[]) 

    useEffect( () => {

        let key = 0
        const carouselInterval = setInterval(() => {
            if ( key === 1 ) {
                setImageCarousel("kitchen")
                carouselHome.current.scrollLeft = 0
                key = 2
            } else if ( key === 2) {
                setImageCarousel("outdoors")
                const pixels = screenWidth * 0.75 * 1.01
                carouselHome.current.scrollLeft = pixels >= 1200 ? 1200 : screenWidth * 0.75 * 1.01 
                key = 3
            } else {
                setImageCarousel("living-room")
                const pixels = screenWidth * 0.75 * 1.01
                carouselHome.current.scrollLeft = pixels >= 1200 ? 2400 : ( screenWidth * 0.75 * 1.01 ) * 2
                key = 1
            }
        }, 7000);
        
        return ( () => {
            clearInterval(carouselInterval)
        })
    },[])

    

    const handleCarouselChange = (tag,carousel) => {
        
        if (tag !== imageCarousel ){
            setImageCarousel(tag)
            if (tag === "kitchen") {
                carousel.current.scrollLeft = 0
            } else if (tag === "outdoors") {
                const pixels = screenWidth * 0.75 * 1.01
                carousel.current.scrollLeft = pixels >= 1200 ? 1200 : screenWidth * 0.75 * 1.01 
            } else {
                const pixels = screenWidth * 0.75 * 1.01
                carousel.current.scrollLeft = pixels >= 1200 ? 2400 : ( screenWidth * 0.75 * 1.01 ) * 2
            }
        }
    }

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            
            // Show popular products in Cookies & Snack category
            <div className="body-home">
                <div className="card-periodic-carousel-container">
                    <div ref={carouselHome} className="card-periodic-carousel">
                        <img className="carousel-item-image" src={require(`../../images/kitchen.webp`)}></img>
                        <img className="carousel-item-image" src={require(`../../images/outdoors.webp`)}></img>
                        <img className="carousel-item-image" src={require(`../../images/living-room.webp`)}></img>
                    </div>
                    <div className="carousel-indicators-container">
                        <div onClick={() => handleCarouselChange("kitchen",carouselHome)}     className={imageCarousel === "kitchen" ? "carousel-indicator-active" : "carousel-indicator"}></div>
                        <div onClick={() => handleCarouselChange("outdoors",carouselHome)}    className={imageCarousel === "outdoors" ? "carousel-indicator-active" : "carousel-indicator"}></div>
                        <div onClick={() => handleCarouselChange("living-room",carouselHome)} className={imageCarousel === "living-room" ? "carousel-indicator-active" : "carousel-indicator"}></div>
                    </div>
                </div>
                <div className="home-first">
                    <div ref={groceriesCard} className="groceries-card">
                        <img alt={"groceries-card"} className="groceries-card-image" src={require(`../../images/groceries.webp`)}></img>
                        <div className="cards-text">Every grocery you need, we have it !</div>
                    </div>
                    <NavigateProductTypes />
                </div>
                <div className="cards-container">
                    <div style={{display:"flex"}} className="tv-audio-panel">
                        <div className="tvs-card">
                            <img alt={"tvs-card"} className="tvs-card-image" src={require(`../../images/tvs.webp`)}></img>
                            <div className="cards-text">Get our new 4k TVs directly from our main store.</div>
                        </div>
                        <NavigateProductTypes />
                    </div>
                    <div style={{display:"flex"}} className="home-panel">
                        <div className="home-card">
                            <img alt={"home-card"} className="home-card-image" src={require(`../../images/home.webp`)}></img>
                            <div className="cards-text">Decorate your home with the best furnitures.</div>
                        </div>
                        <NavigateProductTypes />
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies</div>
                <ProductsAtHome products={products["cookies"]}       type={"cookies"}/>
                <div className="title-popular-products-home">Energy Drinks</div>
                <ProductsAtHome products={products["energy_drinks"]} type={"energy_drinks"}/>  
                <div className="title-popular-products-home">Laptops</div>
                <ProductsAtHome products={products["laptops"]}       type={"laptops"}/>
            </div>
            )
    }else {

        return (
            <TemplateSkeletonHome />
        )   
    }
         
}
export default HomeProducts