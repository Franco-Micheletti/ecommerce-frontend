import React from "react";
import '../css/footer.css'

const Footer =  () => {

    return (

        <div className="footer-container">
            <div className="footer-info">
                <div><a>Contact Us</a></div>
                <div><a>Privacy Policy</a></div>
                <div><a>Get information</a></div>
                <div><a>Get your products at home</a></div>
            </div>
            <div className="social-media-container">
                <img className="social-media-icon" src={require(`../images/insta.png`)}></img>
                <img className="social-media-icon" src={require(`../images/face.png`)}></img>
            </div>
        </div>
    )
    
}

export default Footer