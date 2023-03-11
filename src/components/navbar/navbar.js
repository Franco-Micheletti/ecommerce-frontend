import React,{useRef,useState,useEffect} from "react"
import UserOptions from "../userOptions";
import '../../css/header.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setSearchedString } from '../../state/products/productsSlices'
import { useNavigate } from "react-router-dom";
import { resetAppliedFiltersList } from "../../state/products/productsSlices";

const Navbar = ({loggedIn = false}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const navBar     = useRef()
    const inputBox   = useRef()
    const searchInput = useSelector( (store) => store.stringInputReducer)
    const cartCounter = useSelector( (store) => store.cartCounterReducer)
    const page        = useSelector((store)=> store.pageReducer)
    const [renderUserOptions,setrenderUserOptions] = useState(false)
    

    function loginLink(loggedIn) {

        loggedIn = true
    }
    function toggleUserOptions() {
        
        !renderUserOptions
                ? setrenderUserOptions(true)
                : setrenderUserOptions(false)

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

    loggedIn = true

    function navBarBackground() {
        
        if (window.scrollY > 0 && window.scrollY < 100 && navBar.current !== null ) {
            navBar.current.style.backgroundColor = "#d7d6d6"
            window.removeEventListener("scroll",navBarBackground,true)
            window.addEventListener("scroll",navBarTransparent,true)
        } 
    }
    function navBarTransparent() {
        
        if (window.scrollY < 10 && navBar.current !== null ) {
            navBar.current.style.backgroundColor = "transparent"
            window.removeEventListener("scroll",navBarTransparent,true)
            window.addEventListener("scroll",navBarBackground,true)
        }
    }
    useEffect( () => {
        console.log("creating event listener")
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
            <div ref={navBar} className="header-container">
                <div className="logo-container">
                    <Link to="/" className="logo-container">
                        {/* <img className="logo-image" src={require(`../../images/cart.png`)} width="50" height="50"></img> */}
                        <div className="logo-name">
                            <span style={{color: "#000000"}}>CODENAME:</span><span>MARKET </span>  
                        </div>
                    </Link>
                </div>
                <div ref={inputBox} className="input-box-container">
                    <div style={{alignItems: "center" ,display: "flex",width: "100%"}}><input className="input-box-style" placeholder="Search products" onKeyDown={(e) => handleEnterKeyEvent(e,searchInput,page)} onChange={handleInputChange}></input></div>
                    <div className="search-button-container">
                        <button onClick={() => handleSearchButton(searchInput,page)} className="search-button"><svg className="scope-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></svg></button>
                    </div>
                    
                </div>
                {
                    loggedIn === true
                        ? (
                            <>
                                <div className="user-options-button-container">
                                    <div style={{width:"50px",height:"50px",textDecoration: "none",alignItems:"center",display:"flex"}}>
                                        <Link className="link-to-cart" to="/cart">
                                        <svg className="svg-cart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#858585"><g><path d="M6.787 15.981l14.11-1.008L23.141 6H5.345L5.06 4.37a1.51 1.51 0 0 0-1.307-1.23l-2.496-.286-.114.994 2.497.286a.502.502 0 0 1 .435.41l1.9 10.853-.826 1.301A1.497 1.497 0 0 0 6 18.94v.153a1.5 1.5 0 1 0 1 0V19h11.5a.497.497 0 0 1 .356.15 1.502 1.502 0 1 0 1.074-.08A1.497 1.497 0 0 0 18.5 18H6.416a.5.5 0 0 1-.422-.768zM19.5 21a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5zm-13 0a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5zM21.86 7l-1.757 7.027-13.188.942L5.52 7z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                        <div className="products-in-cart">{cartCounter}</div>
                                        </Link>
                                    </div>
                                    <button className="expand-user-options-button" onClick={toggleUserOptions}><img className="user-image" src={require(`../../images/user.png`)}></img></button>
                                </div>
                                {   renderUserOptions === true
                                                ? <UserOptions />
                                                : <></>
                                }
                            </>
                        )
                        
                        : (<div className="login-link">
                            <button onClick={loginLink}>Login</button>
                        </div>)
                }
                    
            </div>
        </header>
    )
}



export default Navbar