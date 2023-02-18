import React,{useState} from "react"
import UserOptions from "./userOptions";
import '../css/header.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByName } from '../api/fetchProductsByName'
import { setSearchedString } from '../state/products/productsSlices'
import { useNavigate } from "react-router-dom";
import { resetAppliedFiltersList } from "../state/products/productsSlices";

const Navbar = ({loggedIn = false}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchInput = useSelector( (store) => store.stringInputReducer)
    const cartCounter = useSelector( (store) => store.cartCounterReducer)
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

    function handleEnterKeyEvent(e,searchInput) {
        
        if (e.key === 'Enter') {

            dispatch(resetAppliedFiltersList())
            fetchProductsByName(searchInput)
            navigate(`/search/${""}`)
        }
    }

    loggedIn = true
    return (
        
        <header>
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/" className="logo-container">
                        <img className="logo-image" src={require(`../images/cart.png`)} width="50" height="50"></img>
                        <div className="logo-name">
                            <span style={{color: "#2285C7"}}>CODENAME:</span><span>MARKET </span>  
                        </div>
                    </Link>
                </div>
                <div className="input-box-container">
                    <div style={{alignItems: "center" ,display: "flex"}}><input className="input-box-style" placeholder="Search your favorite products" onKeyDown={(e) => handleEnterKeyEvent(e,searchInput)} onChange={handleInputChange}></input></div>
                    <div className="search-button-container">
                        <button className="search-button"><svg className="scope-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></svg></button>
                    </div>
                    
                </div>
                {
                    loggedIn === true
                        ? (
                            <>
                                <div className="user-options-button-container">
                                    <div>
                                        <Link to="/cart">
                                            <img className="cart-shop-icon" src={require("../images/cart-2.png")}></img>
                                            <div className="products-in-cart">{cartCounter}</div>
                                        </Link>
                                    </div>
                                    <button className="expand-user-options-button" onClick={toggleUserOptions}><img className="user-image" src={require(`../images/user.png`)}></img></button>
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