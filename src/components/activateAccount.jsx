import React from "react"
import Navbar from "./navbar/navbar"
import Footer from "./footer"
import '../css/activate.css'

export const ActivateAccount = () => {

    return ( 
        <div>
            <Navbar />
            <div className="activate-container">
                <div className="activate-message-container">
                    <div>Registration Complete!</div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}