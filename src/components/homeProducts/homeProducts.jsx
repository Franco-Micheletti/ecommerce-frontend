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
import { useNavigate,createSearchParams } from "react-router-dom";
// ROUTER
import { Link } from "react-router-dom";

const HomeProducts = () => {
    
    // States
    const products = useSelector( (store) => store.homeProductsReducer)
    const expandAddButton = useSelector((store) => store.expandAddButtonListReducer)
    const favoritesIconChange = useSelector((store) => store.favoritesIconChangeListReducer)
    const userCredentials = store.getState().userCredentialsReducer
    if (Object.keys(userCredentials).length > 0) {
        var userId = jwt(userCredentials["jwt_access"])["user_id"]
    }
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const prodTypes     = useRef([])
    const groceriesCard = useRef()
    const boxesAnimation = useRef()
    const popularCookieSnacks = useRef()
    const popularLaptops = useRef()
    const popularCoffeTables = useRef()
    const box1 = useRef()
    const box2 = useRef()
    const box3 = useRef()
    const box4 = useRef()
    const box5 = useRef()
    const box6 = useRef()

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

        for(let i = 1;i<7;i++) {
            setTimeout(()=> {
                prodTypes.current[i-1].style.top = 0
            },i*200)
        }
        setTimeout(()=> {
            groceriesCard.current.style.marginTop = 0
            box1.current.style.top = "-555px"
            box1.current.style.left = "-555px"
            box2.current.style.top = "-1135px"
            box2.current.style.left = "-328px"
            box3.current.style.top = "-876px"
            box3.current.style.left = "1065px"
            box4.current.style.top = "-950px"
            box4.current.style.left = "1100px"
            box5.current.style.top = "-1100px"
            box5.current.style.left = "1200px"
            box6.current.style.top = "700px"
            box6.current.style.left = "900px"
        },200)
        setTimeout(()=> {
            boxesAnimation.current.style.display = "none"
        },1000)
    },[]) 

    const goToProductType = (q) => {
        dispatch(resetAppliedFiltersList())
        const params = { q: q, page: '1' };
        navigate({
        pathname: '/search/',
        search: `?${createSearchParams(params)}`,
        });
    }

    const handleScrollLeft = (container) => {
        container.current.scrollLeft -= 226
        
    }
    const handleScrollRight = (container) => {
        container.current.scrollLeft += 226
    }
    

    if ( typeof products === "object" && products !== null ) {
        
        return ( 
            // Show popular products in Cookies & Snack category
            <div className="body-home">
                <div className="home-first">
                    <div className="home-navigate-product-types">
                        <div onClick={()=> goToProductType("table")} ref={(el) => prodTypes.current[0] = el} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/coffe-tables.webp`)}></img>
                            <label>Coffe Tables</label>
                        </div>
                        <div onClick={()=> goToProductType("laptop")} ref={(el) => prodTypes.current[1] = el} className="navigate-product-type-home">
                        <img className="home-product-types-image" src={require(`../../images/laptops.webp`)}></img>
                            <label>Laptops</label>
                        </div>
                        <div onClick={()=> goToProductType("Energy Drinks")} ref={(el) => prodTypes.current[2] = el} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/energy-drinks.webp`)}></img>
                            <label>Energy Drinks</label>
                        </div>
                        <div onClick={()=> goToProductType("Soda Pop")} ref={(el) => prodTypes.current[3] = el} className="navigate-product-type-home">
                        <img className="home-product-types-image" src={require(`../../images/sodas.webp`)}></img>
                            <label>Soda Pop</label>
                        </div>
                        <div onClick={()=> goToProductType("Cookies")} ref={(el) => prodTypes.current[4] = el} className="navigate-product-type-home">
                            <img className="home-product-types-image" src={require(`../../images/cookies.webp`)}></img>
                            <label>Cookies</label>
                        </div>
                        <div style={{justifyContent:"center"}} onClick={()=> goToProductType("Cookies")} ref={(el) => prodTypes.current[5] = el} className="navigate-product-type-home">
                            <label>More</label>
                        </div>
                    </div>
                    <div ref={groceriesCard} className="groceries-card">
                        <img alt={"groceries-card"} className="groceries-card-image" src={require(`../../images/groceries.webp`)}></img>
                        <div className="cards-text">Every grocery you need, we have it !</div>
                    </div>
                </div>
                <div ref={boxesAnimation} className="boxes-animation">
                    <div className="box-container">
                        <img ref={box1} style={{top: "-36px",left: "382px"}} className="box" src={require(`../../images/box.png`)}></img>
                        <img ref={box2} style={{top: "-36px",left: "382px"}}className="box" src={require(`../../images/box.png`)}></img>
                        <img ref={box3} style={{top: "21px",left: "-11px"}}className="box" src={require(`../../images/box.png`)}></img>
                        <img ref={box4} style={{top: "33px",left: "-72px"}}className="box" src={require(`../../images/box.png`)}></img>
                        <img ref={box5} style={{top: "41px",left: "-129px"}}className="box" src={require(`../../images/box.png`)}></img>
                        <img ref={box6} style={{top: "-82px",left: "-523px"}}className="box" src={require(`../../images/box.png`)}></img>
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
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleScrollLeft(popularCookieSnacks)} className="horizontal-scroll-left"><svg className="svg-scroll-icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div ref={popularCookieSnacks} id="popular-cookies-snacks" className="popular-products-home">
                        { 
                        products.map( (product) =>
                            
                            {   
                                console.log(product)
                                const imageFile = product["product_image_tag"]
                                const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                                const id = product["id"]
                                return (
                                    <div className="popular-product-item">
                                        {
                                            favoritesIconChange.includes(product["id"]) === true
                                                ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-home-added">
                                                        <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                                                    </div>
                                                :    <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon-home">
                                                        <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                                                    </div>
                                        }
                                        <Link to={`/${formatedName}/${id}`}>
                                            <img className="home-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                        </Link>
                                        {
                                        expandAddButton[product["id"]]
                                            ? <button style={{width: "150px" }} className="button-product-add-home">
                                                <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                    <label>-</label>
                                                </div>
                                                <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                                <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                    <label>+</label>
                                                </div>
                                                </button> 

                                            : <button onClick={ () => addProductToCart(product)} className="button-product-add-home">
                                                <div>Add</div>
                                                </button>
                                        }
                                        <div className="product-price-search">${product['price']}</div>
                                        {   
                                            product['reviews']
                                                ?   <div className="avg-score">
                                                        <div className="stars">
                                                        {   
                                                            product['avg_score'] >= 1 && product['avg_score'] < 1.5
                                                                ? <span className="review-score">&#9733;&#9734;&#9734;&#9734;&#9734;</span>
                                                                :  product['avg_score'] >= 1.5 && product['avg_score'] < 2.5
                                                                        ? <span className="review-score">&#9733;&#9733;&#9734;&#9734;&#9734;</span>
                                                                        : product['avg_score'] >= 2.5 && product['avg_score'] < 3.5
                                                                            ? <span className="review-score">&#9734;&#9733;&#9733;&#9734;&#9734;</span>
                                                                            : product['avg_score'] >= 3.5 && product['avg_score'] < 4.5
                                                                                ? <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                                                                : <span className="review-score">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                                        }
                                                        </div>
                                                        <div className="total-reviews">{product['reviews'].length}</div>
                                                    </div>
                                                :   <></>
                                        }
                                       
                                        <div className="popular-products-product-name">{product['product_name']}</div>
                                    </div>
                                    )
                            }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleScrollRight(popularCookieSnacks)} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleScrollLeft(popularCookieSnacks)} className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div ref={popularCoffeTables} id="popular-coffe-tables" className="popular-products-home">
                        
                        { 
                        products.map( (product) =>
                                
                        {   
                            const imageFile = product["product_image_tag"]
                            const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                            const id = product["id"]
                            return (
                                <div className="popular-product-item">
                                    {
                                        favoritesIconChange.includes(product["id"]) === true
                                            ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-home-added">
                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                                                </div>
                                            :    <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon-home">
                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                                                </div>
                                    }
                                    <Link to={`/${formatedName}/${id}`}>
                                        <img className="home-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                    </Link>
                                    {
                                    expandAddButton[product["id"]]
                                        ? <button style={{width: "150px" }} className="button-product-add-home">
                                            <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                <label>-</label>
                                            </div>
                                            <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                            <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                <label>+</label>
                                            </div>
                                            </button> 

                                        : <button onClick={ () => addProductToCart(product)} className="button-product-add-home">
                                            <div>Add</div>
                                            </button>
                                    }
                                    <div className="product-price-search">${product['price']}</div>
                                    <div className="popular-products-product-name">{product['product_name']}</div>
                                </div>
                                )
                        }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleScrollRight("right",1,"popular-cookies-snacks")} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
                <div className="title-popular-products-home">Cookies & Snacks</div>
                <div className="popular-products-wraper">
                    <div>
                        <button id="scroll-left-1" onClick ={ () => handleScrollLeft(popularLaptops)} className="horizontal-scroll-left"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                    <div ref={popularLaptops} id="popular-laptops" className="popular-products-home">
                        
                        { 
                        products.map( (product) =>
                                
                        {   
                            const imageFile = product["product_image_tag"]
                            const formatedName = product["product_name"].replaceAll(" ","-").toLowerCase()
                            const id = product["id"]
                            return (
                                <div className="popular-product-item">
                                    {
                                        favoritesIconChange.includes(product["id"]) === true
                                            ?   <div onClick={() => removeProductFromUserFavorites(product["id"],userId)} className="to-favorite-icon-home-added">
                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="0.1"></path></svg>
                                                </div>
                                            :    <div onClick={() => addProductToUserFavorites(product["id"],userId)} className="to-favorite-icon-home">
                                                    <svg viewBox="0 0 24 24" fill="#3b82a0" stroke="#5baea0"><path fillRule="evenodd" clipRule="evenodd" d="M11.9694 22C12.5756 22 12.9181 21.4709 13.8945 20.435C15.115 19.1402 16.2918 17.9336 17.1462 17.0272C19.6691 14.3511 20.661 13.3356 21.3649 12.5433C23.2357 10.4378 23.4784 7.51229 22.2097 5.29142C20.6101 2.49159 18.2247 2 16.9421 2C15.6594 2 14.7421 2.49159 13.1221 3.75703L11.9989 4.8084L10.9063 3.75703C9.1489 2.25488 7.87646 2 7.05939 2C6.37842 2 3.5339 2.00043 1.70086 5.29142C0.363371 7.6927 1.0623 10.6507 2.76628 12.5433C3.07139 12.8822 4.32884 14.1998 6.51094 16.572C7.3895 17.5272 8.63263 18.8407 9.54781 19.8382C10.0663 20.4034 11.3631 22 11.9694 22Z" stroke="#3b82a0" strokeWidth="1.5"></path></svg>
                                                </div>
                                    }
                                    <Link to={`/${formatedName}/${id}`}>
                                        <img className="home-product-image" src={require(`../../images/${imageFile}-1.webp`)}></img>
                                    </Link>
                                    {
                                    expandAddButton[product["id"]]
                                        ? <button style={{width: "150px" }} className="button-product-add-home">
                                            <div className="expandedAddLessButton" onClick={ () => removeProductFromCart(product["id"])}>
                                                <label>-</label>
                                            </div>
                                            <div>{expandAddButton[product["id"]]["quantity"]}</div>
                                            <div className="expandedAddMoreButton" onClick={ () => addProductToCart(product)}>
                                                <label>+</label>
                                            </div>
                                            </button> 

                                        : <button onClick={ () => addProductToCart(product)} className="button-product-add-home">
                                            <div>Add</div>
                                            </button>
                                    }
                                    <div className="product-price-search">${product['price']}</div>
                                    <div className="popular-products-product-name">{product['product_name']}</div>
                                </div>
                                )
                        }
                        )
                        }   
                    </div>
                    <div>
                        <button id="scroll-right-1" onClick ={ () => handleScrollRight(popularLaptops)} className="horizontal-scroll-right"><svg className="svg-scroll-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg></button>
                    </div>
                </div>
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