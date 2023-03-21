
import React,{useEffect} from "react"
import Footer from "../footer"
import Navbar from "../navbar/navbar"
import '../../css/register.css'
import { handleInputChange } from "./functions/handleInputChange"
import { handleRegisterSubmit } from "./functions/registerSubmit"
import { useSelector } from "react-redux"

export const Register = () => {

    const registrationFormData = useSelector( (store) => store.registrationFormDataReducer)
    const formErrors = useSelector( (store) => store.formErrorsReducer)
    
    useEffect(() => {
        document.body.style.position = "relative"
    }, [])
    
    return(
        <div>
            <Navbar  />
            <div className="body-register">
                <form onSubmit={(e) => handleRegisterSubmit(e)} className="register-inputs-container">
                    <label className="register-text"></label>
                    <input type={"text"}    onChange={(e)=>handleInputChange(e)} id="firstname" value={registrationFormData.firstname} placeholder={"First name"}></input>
                    <input type={"text"}    onChange={(e)=>handleInputChange(e)} id="lastname"  value={registrationFormData.lastname}  placeholder={"Last name"}></input>
                    <input type={"text"}    onChange={(e)=>handleInputChange(e)} id="username"  value={registrationFormData.username}  placeholder={"Username"}></input>
                    <input type={"password"}onChange={(e)=>handleInputChange(e)} id="password"  value={registrationFormData.password}  placeholder={"Password"}></input>
                    <input type={"date"}    onChange={(e)=>handleInputChange(e)} id="birthday"  value={registrationFormData.birthday}  placeholder={"Birthday"}></input>
                    <input type={"text"}    onChange={(e)=>handleInputChange(e)} id="phone"     value={registrationFormData.phone}     placeholder={"Phone Number"}></input>
                    <input type={"email"}   onChange={(e)=>handleInputChange(e)} id="email"     value={registrationFormData.email}     placeholder={"Email"}></input>
                    <div className="field-error-container">
                        {formErrors.map((error) =>
                            {
                                return (
                                        <label>{error}</label>
                                        )
                            }
                            
                        )}
                    </div>
                    <button type="submit" className="register-window-submit-button">Register</button>
                </form>
            </div>
            <Footer  />
        </div>
    )

}