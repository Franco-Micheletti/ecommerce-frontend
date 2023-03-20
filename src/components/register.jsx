
import React from "react"
import Footer from "./footer"
import Navbar from "./navbar/navbar"
import '../css/userOptions.css' 

export const Register = () => {

    return(
        <div>
            <Navbar  />
            <div className="body-register">
                <form className="register-inputs-container">
                    <label className="register-text">Register</label>
                    <input type={"text"}     placeholder={"Firstname"}></input>
                    <input type={"text"}     placeholder={"Lastname"}></input>
                    <input type={"text"}     placeholder={"Username"}></input>
                    <input type={"password"} placeholder={"Password"}></input>
                    <input type={"date"}     placeholder={"Birthday"}></input>
                    <input type={"text"}     placeholder={"Phone Number"}></input>
                    <input type={"email"}    placeholder={"Add your email"}></input>
                    <button type="submit" className="register-window-submit-button">Register</button>
                </form>
            </div>
            <Footer  />
        </div>
    )

}