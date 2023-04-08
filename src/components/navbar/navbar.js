import React,{useRef,useState,useEffect} from "react"
// COMPONENTS
import { FavoritesPreviewWindow } from "../favoritesPreviewWindow";
import UserOptions from "../userOptions"
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setSearchedString } from '../../state/products/productsSlices'
import { setJwtAccess,setJwtRefresh,setRenderUserOptions } from "../../state/user/userSlices";
import { setShowFavoritesPreview } from "../../state/favorites/favoritesSlices";
import { resetAppliedFiltersList } from "../../state/products/productsSlices";
import { resetFormErrors } from "../../state/user/userSlices";
// CSS
import '../../css/header.css'
// ROUTER
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// FUNCTIONS
import { login } from "./functions/login";


const Navbar = () => {

    const navigate              = useNavigate()
    const dispatch              = useDispatch()
    const navBar                = useRef()
    const inputBox              = useRef()
    const overlayLogin          = useRef()
    const loginWindow           = useRef()
    const searchInput           = useSelector( (store) => store.stringInputReducer)
    const cartCounter           = useSelector( (store) => store.cartCounterReducer)
    const page                  = useSelector( (store)=> store.pageReducer)
    const userCredentials       = useSelector( (store)=> store.userCredentialsReducer)
    const renderUserOptions     = useSelector( (store)=> store.renderUserOptionsReducer)
    const formErrors            = useSelector( (store) => store.formErrorsReducer)
    const showFavoritesPreview  = useSelector( (store) => store.showFavoritesPreviewReducer)
    const screenWidth           = window.innerWidth > 0 ? window.innerWidth : Screen.width;

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading]   = useState(false)
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const loginData = await login({username,password})
            
            if (loginData["access"] && loginData["refresh"]) {
                dispatch(setJwtAccess(loginData["access"]))
                dispatch(setJwtRefresh(loginData["refresh"]))
                setLoading(false)
                removeEventListener()
            }
        } catch (error) {
            setLoading(false)
        }
        
        
    }
    const clickLoginButton = () => {

        overlayLogin.current.style.display = "block"
        loginWindow.current.style.display  = "flex"
        overlayLogin.current.addEventListener("click",removeEventListener,true)
        document.body.style.position = "fixed"
    }
    
    const removeEventListener = () => {
        dispatch(resetFormErrors())
        setUsername("")
        setPassword("")
        document.body.style.position = "static"
        overlayLogin.current.style.display = "none"
        loginWindow.current.style.display  = "none"
        overlayLogin.current.removeEventListener("click",removeEventListener,true)
    }

    function toggleUserOptions() {
        
        !renderUserOptions
                ? dispatch(setRenderUserOptions(true))
                : dispatch(setRenderUserOptions(false))

    }

    function handleInputChange(e) {
        
        dispatch(setSearchedString(e.target.value))
        
    }

    function handleEnterKeyEvent(e,searchInput,page) {
        
        if (e.key === 'Enter') {
            dispatch(resetAppliedFiltersList())
            navigate(`/search/?q=${searchInput}&page=${page}`)
        }
    }

    function handleSearchButton(searchInput,page) {
        dispatch(resetAppliedFiltersList())
        navigate(`/search/?q=${searchInput}&page=${page}`)
    }

    function navBarBackground() {
        
        if (window.scrollY > 0 && window.scrollY < 100 && navBar.current !== null ) {
            // navBar.current.style.backgroundColor = "#ffffff"
            // navBar.current.style.boxShadow = "0 1px 6px 0 rgba(32, 33, 36, 0.28)";
            window.removeEventListener("scroll",navBarBackground,true)
            window.addEventListener("scroll",navBarTransparent,true)
        } 
    }
    function navBarTransparent() {

        if (window.scrollY < 10 && navBar.current !== null ) {
            // navBar.current.style.backgroundColor = "transparent"
            // navBar.current.style.boxShadow = "none";
            window.removeEventListener("scroll",navBarTransparent,true)
            window.addEventListener("scroll",navBarBackground,true)
        }
    }
    useEffect( () => {
        
        window.addEventListener("scroll",navBarBackground,true)
        setTimeout(()=> {
            inputBox.current.style.marginTop = "0px"
        },500)
        
        return () => {
            window.removeEventListener("scroll",navBarTransparent,true)
            window.removeEventListener("scroll",navBarBackground,true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        
        <header className="header">
            <div>
                <div ref={overlayLogin} style={{display:"none"}} className="login-window-background"></div>
                <div ref={loginWindow} style={{display:"none"}} className="login-window">
                    <form onSubmit={(e) => handleLoginSubmit(e)}>
                        <div className="login-inputs-container">
                            <input placeholder={"user"} value={username} onChange={(e)=> setUsername(e.target.value)} />
                            <input type="password" placeholder={"password"} value={password} onChange={(e)=> setPassword(e.target.value)} />
                            <div className="field-error-container-login">
                                { formErrors.map((error) =>
                                    { return (<label>{error}</label>) }
                                )}
                            </div>
                            <button disabled={loading} type="submit" className="login-window-submit-button">Login</button>
                            <div className="register-link-container">¿ Don't have an account ? <Link style={{textDecoration: 'none'}}to="/register"><div className="register-link-text">Register</div></Link> </div>
                        </div>
                    </form>
                </div>
            </div>
            <div ref={navBar} className="header-container">
                <div className="input-logo-container">
                    <div className="logo-container">
                        <Link to="/" className="logo-container">
                            <div className="logo-name">
                                <span style={{color: "#000000"}}>CODENAME:</span><span>MARKET </span>  
                            </div>
                        </Link>
                    </div>
                    <div ref={inputBox} className={userCredentials["jwt_access"]?"input-box-container":"input-box-container-no-login"}>
                        <div style={{width:"inherit"}} ><input className="input-box-style" placeholder="Search products" onKeyDown={(e) => handleEnterKeyEvent(e,searchInput,page)} onChange={handleInputChange}></input></div>
                        <div className="search-button-container">
                            <button onClick={() => handleSearchButton(searchInput,page)} className="search-button"><svg className="scope-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></svg></button>
                        </div>
                    </div>
                </div>
                {   
                    userCredentials["jwt_access"]
                        ? (
                            <>
                                <div className="user-options-button-container">
                                    <div onClick={()=> showFavoritesPreview ? dispatch(setShowFavoritesPreview(false)) : dispatch(setShowFavoritesPreview(true))} className="link-favorites"><svg fill="#000000" height="35px" width="35px" version="1.1 "viewBox="0 0 455 455"> <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769 l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029 c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368 c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771 c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"></path></svg></div>
                                    {
                                        showFavoritesPreview
                                            ? <FavoritesPreviewWindow />
                                            : <></>
                                    }
                                    <div className="cart-container">
                                        <Link className="link-to-cart" to="/cart">
                                            <svg className="svg-cart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#858585"><g><path d="M6.787 15.981l14.11-1.008L23.141 6H5.345L5.06 4.37a1.51 1.51 0 0 0-1.307-1.23l-2.496-.286-.114.994 2.497.286a.502.502 0 0 1 .435.41l1.9 10.853-.826 1.301A1.497 1.497 0 0 0 6 18.94v.153a1.5 1.5 0 1 0 1 0V19h11.5a.497.497 0 0 1 .356.15 1.502 1.502 0 1 0 1.074-.08A1.497 1.497 0 0 0 18.5 18H6.416a.5.5 0 0 1-.422-.768zM19.5 21a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5zm-13 0a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5zM21.86 7l-1.757 7.027-13.188.942L5.52 7z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                            <div className="products-in-cart">{cartCounter}</div>
                                        </Link>
                                    </div>
                                    
                                    <button className="expand-user-options-button" onClick={toggleUserOptions}><img alt={"user-small"} className="user-image" src={require(`../../images/user.png`)}></img></button>
                                </div>
                                {   renderUserOptions
                                        ? <UserOptions />
                                        : <></>
                                }
                            </>
                        )
                        
                        : (<div onClick={clickLoginButton} className="login-button">
                            <div>Login</div>
                        </div>)
                }
                    
            </div>
        </header>
    )
}



export default Navbar