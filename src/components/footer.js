import React from "react";
import '../css/footer.css'

const Footer =  () => {

    return (

        <div className="footer-container">
            <div className="footer-my-info">
            <div className="footer-title">Author</div>
                <div>Website created by Franco Micheletti, FullStack Developer</div>
                <div>Project duration: 18/02/2023 - 20/04/2023</div>
                <div>This is a e-commerce project i made with React.js and Django Rest Framework.</div>
                <div className="footer-contact-me">
                    <div>Contact me at</div>
                    <a href="https://www.linkedin.com/in/franco-micheletti-62a9901b7/">
                        <img width={"24"} height={"24"} alt="linkedin-contact" src={require(`../images/linkedin.webp`)}></img>
                    </a>
                </div>
            </div>
            <div className="footer-disclaimer">
                <div className="footer-title">Disclaimer</div>
                <div>All the products you see in this website are not being sold by any user or company, most of the images are obtained from <a className="walmart-link" href="https://www.walmart.com/">Walmart's </a>website.</div>
                <div>If u think any of the content displayed in this website breaks any rule, please contact me at LinkedIn and i will remove it immediately.</div>
            </div>
        </div>
    )
}

export default Footer