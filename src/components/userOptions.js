import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../css/register.css' 
import { logout } from "./navbar/functions/logout";
import { store } from "../state/store";
import jwt from 'jwt-decode'
import { getUserData } from "../api/getUserData";
import { useSelector } from "react-redux";
import { setUserData } from "../state/user/userSlices";

const UserOptions = () => {
    
    const navigate = useNavigate()
    const userData = useSelector((store) => store.userDataReducer)
    useEffect(() => {
        
        const userCredentials = store.getState().userCredentialsReducer
        let access = jwt(userCredentials["jwt_access"])["user_id"]
        if (Object.keys(userData).length === 0) {
            getUserData(access)
        }
    }, [])
    
    const handleOnClickLogOut = () => {
        logout()
        store.dispatch(setUserData({}))
        navigate("/",{replace:true})
    }

    return (
        <div className="user-options-windows">
            <div>
                <img className="user-image-medium" src={require(`../images/user.png`)}></img>
                <div className="user-info">
                    <div className="user-name"><label>{userData["first_name"]}</label> <label>{userData["last_name"]}</label></div>
                    <div className="user-email">{userData["email"]}</div>
                </div>
            </div>
            <div>
                <a className="manage-account">Manage your Account</a>
            </div>
            <div onClick={handleOnClickLogOut} className="log-out"> 
                <svg height="21" viewBox="0 0 24 24" width="21" focusable="false"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                <div>
                    <div className="logout-text">Logout</div>
                </div>
            </div>
            <div className="privacy-conditions-container">
                <div>
                    <a className="privacy-policy-link">
                    Privacy Policy
                    </a>
                </div>
                <span> 
                - 
                </span>
                <div>
                    <a className="conditions-link">
                    Conditions
                    </a>
                </div>
            </div>
            
        </div>
    )
}

export default UserOptions