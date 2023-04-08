import React from "react"
import Navbar from "./navbar/navbar"
import Footer from "./footer"
import '../css/activate.css'
import { getFavoritesProductsOfUser } from "../api/getFavoritesProductsOfUser"
import { store } from "../state/store"
import jwt from "jwt-decode"

export const Favorites = () => {

    const userCredentials = store.getState().userCredentialsReducer
    let id = jwt(userCredentials["jwt_access"])["user_id"]
    const favoriteProducts = getFavoritesProductsOfUser(id)
    
    return ( 
        <div>
            <Navbar />
            <div className="activate-container">
                <div className="activate-message-container">
                    <div>Registration Complete!</div>
                    <div>Please check your email and click the link we have sent to activate your account.</div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}