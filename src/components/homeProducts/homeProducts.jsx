import React,{useEffect,useRef} from "react";
import jwt from "jwt-decode";
// CSS IMPORTS
import '../../css/products.css'
import '../../css/home.css'
import '../../css/skeleton.css'
// REDUX
import { useSelector,useDispatch } from "react-redux";
import { resetAppliedFiltersList } from "../../state/products/productsSlices";
import { store } from "../../state/store";
// API
import { fetchHomeProducts } from "../../api/fetchHomeProducts";
// FUNCTIONS
import { addProductToCart } from "../cart/functions/addProductToCart";
import { removeProductFromCart } from "../cart/functions/removeProductFromCart";
import { addProductToUserFavorites,removeProductFromUserFavorites } from "../../api/favoriteProduct";
// COMPONENTS
import { TemplateSkeletonHome } from "../templateSkeletonHome"
import { ProductsAtHome } from "./childComponents/productsAtHome";
// ROUTER
import { Link } from "react-router-dom";
import { setShowMobileFilterContainer } from "../../state/filters/filtersSlices";
import { useNavigate,createSearchParams } from "react-router-dom";

const HomeProducts = () => {
    
    // States
    const products = useSelector( (store) => store.homeProductsReducer)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const groceriesCard = useRef()
   
    useEffect( () => {

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

    const goToProductType = (q) => {
        dispatch(resetAppliedFiltersList())
        const params = { q: q, page: '1' };
        navigate({
        pathname: '/search/',
        search: `?${createSearchParams(params)}`,
        });
    }

    
    

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            // Show popular products in Cookies & Snack category
            <div className="body-home">
                <div className="home-first">
                    <div className="home-navigate-product-types">
                        <div onClick={()=> goToProductType("table")} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/coffe-tables.webp`)}></img>
                            <label>Coffe Tables</label>
                        </div>
                        <div onClick={()=> goToProductType("laptop")} className="navigate-product-type-home">
                        <img className="home-product-types-image" src={require(`../../images/laptops.webp`)}></img>
                            <label>Laptops</label>
                        </div>
                        <div onClick={()=> goToProductType("Energy Drinks")} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/energy-drinks.webp`)}></img>
                            <label>Energy Drinks</label>
                        </div>
                        <div onClick={()=> goToProductType("Soda Pop")} className="navigate-product-type-home">
                        <img className="home-product-types-image" src={require(`../../images/sodas.webp`)}></img>
                            <label>Soda Pop</label>
                        </div>
                        <div onClick={()=> goToProductType("Cookies")} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/cookies.webp`)}></img>
                            <label>Cookies</label>
                        </div>
                        <div style={{justifyContent:"center"}} onClick={()=> goToProductType("Cookies")}  className="navigate-product-type-home">
                            <label>More</label>
                        </div>
                    </div>
                    <div ref={groceriesCard} className="groceries-card">
                        <img alt={"groceries-card"} className="groceries-card-image" src={require(`../../images/groceries.webp`)}></img>
                        <div className="cards-text">Every grocery you need, we have it !</div>
                    </div>
                </div>
                <div className="cards-container">
                    <div style={{display:"flex"}} className="tv-audio-panel">
                        <div className="tvs-card">
                            <img alt={"tvs-card"} className="tvs-card-image" src={require(`../../images/tvs.webp`)}></img>
                            <div className="cards-text">Get our new 4k TVs directly from our main store.</div>
                        </div>
                        <div className="home-navigate-product-types">
                            <div onClick={()=> goToProductType("table")} className="navigate-tv-audio">
                                <img className="home-product-types-image" src={require(`../../images/coffe-tables.webp`)}></img>
                                <label>Coffe Tables</label>
                            </div>
                            <div onClick={()=> goToProductType("laptop")} className="navigate-tv-audio">
                            <img className="home-product-types-image" src={require(`../../images/laptops.webp`)}></img>
                                <label>Laptops</label>
                            </div>
                            <div onClick={()=> goToProductType("Energy Drinks")} className="navigate-tv-audio">
                                <img className="home-product-types-image" src={require(`../../images/energy-drinks.webp`)}></img>
                                <label>Energy Drinks</label>
                            </div>
                            <div onClick={()=> goToProductType("Soda Pop")} className="navigate-tv-audio">
                            <img className="home-product-types-image" src={require(`../../images/sodas.webp`)}></img>
                                <label>Soda Pop</label>
                            </div>
                            <div onClick={()=> goToProductType("Cookies")} className="navigate-tv-audio">
                                <img className="home-product-types-image" src={require(`../../images/cookies.webp`)}></img>
                                <label>Cookies</label>
                            </div>
                            <div style={{justifyContent:"center"}} onClick={()=> goToProductType("Cookies")} className="navigate-tv-audio">
                                <label>More</label>
                            </div>
                        </div>
                    </div>
                    <div style={{display:"flex"}} className="home-panel">
                        <div className="home-card">
                            <img alt={"home-card"} className="home-card-image" src={require(`../../images/home.webp`)}></img>
                            <div className="cards-text">Decorate your home with the best furnitures.</div>
                        </div>
                        <div className="home-navigate-product-types">
                            <div onClick={()=> goToProductType("table")} className="navigate-home-furnitures">
                                <img className="home-product-types-image" src={require(`../../images/coffe-tables.webp`)}></img>
                                <label>Coffe Tables</label>
                            </div>
                            <div onClick={()=> goToProductType("laptop")} className="navigate-home-furnitures">
                            <img className="home-product-types-image" src={require(`../../images/laptops.webp`)}></img>
                                <label>Laptops</label>
                            </div>
                            <div onClick={()=> goToProductType("Energy Drinks")} className="navigate-home-furnitures">
                                <img className="home-product-types-image" src={require(`../../images/energy-drinks.webp`)}></img>
                                <label>Energy Drinks</label>
                            </div>
                            <div onClick={()=> goToProductType("Soda Pop")} className="navigate-home-furnitures">
                            <img className="home-product-types-image" src={require(`../../images/sodas.webp`)}></img>
                                <label>Soda Pop</label>
                            </div>
                            <div onClick={()=> goToProductType("Cookies")} className="navigate-home-furnitures">
                                <img className="home-product-types-image" src={require(`../../images/cookies.webp`)}></img>
                                <label>Cookies</label>
                            </div>
                            <div style={{justifyContent:"center"}} onClick={()=> goToProductType("Cookies")} className="navigate-home-furnitures">
                                <label>More</label>
                            </div>
                        </div>
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
    }
    else {

        return (
            <TemplateSkeletonHome />
        )   
    }
         
}
export default HomeProducts