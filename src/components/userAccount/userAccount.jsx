import React,{useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { setConfigurationPanelState } from "../../state/user/userSlices"
import { AccountInfo } from "./childsComponents/accountInfo"
import { AllFavorites } from "./childsComponents/allFavorites"
import { Myreviews } from "./childsComponents/myReviews"
import { ShoppingHistory } from "./childsComponents/shoppingHistory"
import { PaymentMethods } from "./childsComponents/paymentMethods"
import { DeleteAccount } from "./childsComponents/deleteAccount"
import Footer from '../footer';
import Navbar from '../navbar/navbar'
import '../../css/userAccount.css'
import Home  from '../home/home'
import jwt from 'jwt-decode'
import { store } from "../../state/store";
import { getUserData } from "../../api/getUserData";
import { useNavigate } from "react-router-dom"
import { setRenderUserOptions } from "../../state/user/userSlices"

export const UserAccount = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const configurationPanelState = useSelector(store => store.configurationPanelReducer)
    const userData = useSelector((store) => store.userDataReducer)
    const [userId,setUserId] = useState(null)
    const [isAuthorized,setIsAuthorized] = useState(false)
    const userCredentials = store.getState().userCredentialsReducer

    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    useEffect( () => {
        
        dispatch(setRenderUserOptions(false))

        if (Object.keys(userCredentials).length > 0) {
            let user_id = jwt(userCredentials["jwt_access"])["user_id"]
            setUserId(user_id)
            if (Object.keys(userData).length === 0) {
                getUserData(user_id)
            }
            setIsAuthorized(true)
        } else {
            setIsAuthorized(false)
            navigate({pathname: '/'})
        }

        
    }, [])
    

    return (
        isAuthorized
            ?   <div>
                    <Navbar />
                    <div className="manage-account-page">
                        {
                            screenWidth > 950
                                
                                ?   <div className="manage-account-options">
                                        <div onClick={() => dispatch(setConfigurationPanelState("showAccountInfo")) }       className={configurationPanelState === "showAccountInfo" ? "active-option account-options-item " : "account-options-item" }><label>Account Info</label></div>
                                        <div onClick={() => dispatch(setConfigurationPanelState("showFavorites")) }         className={configurationPanelState === "showFavorites" ? "account-options-item active-option" : "account-options-item" }    ><label>My Favorites</label></div>
                                        <div onClick={() => dispatch(setConfigurationPanelState("showReviews")) }           className={configurationPanelState === "showReviews" ? "account-options-item active-option" : "account-options-item" }><label>My Reviews</label></div>
                                        <div onClick={() => dispatch(setConfigurationPanelState("showShoppingHistory")) }   className={configurationPanelState === "showShoppingHistory" ? "account-options-item active-option" : "account-options-item" }><label>Shopping history</label></div>
                                        <div onClick={() => dispatch(setConfigurationPanelState("showPaymentMethods")) }    className={configurationPanelState === "showPaymentMethods" ? "account-options-item active-option" : "account-options-item" }><label>Payment Methods</label></div>
                                        <div onClick={() => dispatch(setConfigurationPanelState("showDeleteAccount")) }     className={configurationPanelState === "showDeleteAccount" ? "active-option account-options-item" : "account-options-item" }><label>Delete Account</label></div>
                                    </div>


                                :   <div className="user-account-mobile-navigate">
                                        <div className="user-account-management-title">Account Management</div>
                                        <div className="manage-account-options">
                                            <div onClick={() => dispatch(setConfigurationPanelState("showAccountInfo")) }>
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{ backgroundColor: configurationPanelState === "showAccountInfo" ? "rgb(226 232 237)" : "transparent"}} 
                                                    viewBox="0 0 24 24" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g><g> <path d="M12,12.75A5.25,5.25,0,1,0,6.75,7.5,5.256,5.256,0,0,0,12,12.75Zm0-9A3.75,3.75,0,1,1,8.25,7.5,3.754,3.754,0,0,1,12,3.75Zm7.75,14.217v1.011a3.769,3.769,0,0,1-.961,2.522.75.75,0,1,1-1.118-1,2.278,2.278,0,0,0,.579-1.522V17.967a3.259,3.259,0,0,0-2.443-3.185,1.011,1.011,0,0,0-.746.1,6.307,6.307,0,0,1-6.116,0,1.013,1.013,0,0,0-.751-.1A3.262,3.262,0,0,0,5.75,17.967v1.011A2.278,2.278,0,0,0,6.329,20.5a.75.75,0,1,1-1.118,1,3.769,3.769,0,0,1-.961-2.522V17.967a4.759,4.759,0,0,1,3.577-4.64,2.529,2.529,0,0,1,1.854.247,4.8,4.8,0,0,0,4.644,0,2.525,2.525,0,0,1,1.849-.244A4.759,4.759,0,0,1,19.75,17.967Z"></path> </g> </g>
                                                </svg>
                                            </div>
                                            <div onClick={() => dispatch(setConfigurationPanelState("showFavorites")) } >
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{backgroundColor: configurationPanelState === "showFavorites" ? "rgb(226 232 237)" : "transparent"}} 
                                                    viewBox="0 0 32 32"><g strokeLinecap="round" strokeLinejoin="round"></g><g> <title></title> <g data-name="Layer 20" > <path d="M25,8H15.8L13.51,6a4,4,0,0,0-2.64-1H7A4,4,0,0,0,3,9V23a4,4,0,0,0,4,4H25a4,4,0,0,0,4-4V12A4,4,0,0,0,25,8Zm2,15a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V9A2,2,0,0,1,7,7h3.87a2,2,0,0,1,1.32.49l2.58,2.26a1,1,0,0,0,.66.25H25a2,2,0,0,1,2,2Z"></path> <path d="M16,14.23a3.08,3.08,0,0,0-3.54.53,3,3,0,0,0,0,4.24l2.83,2.83a1,1,0,0,0,1.42,0L19.54,19a3,3,0,0,0,0-4.24A3.07,3.07,0,0,0,16,14.23Zm2.12,3.36L16,19.71l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0,1,1,0,0,0,1.42,0,1,1,0,0,1,1.41,1.42Z"></path> </g> </g>
                                                </svg>
                                            </div>
                                            <div onClick={() => dispatch(setConfigurationPanelState("showReviews")) }>
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{backgroundColor: configurationPanelState === "showReviews" ? "rgb(226 232 237)" : "transparent"}} 
                                                    viewBox="0 0 490 490"><g> <g> <g> <path d="M446.52,174.433c-27.254-20.921-63.341-32.443-101.616-32.443c-23.143,0-45.482,4.22-65.555,12.175 c-10.033-19.097-26.771-36.009-48.063-48.316c-25.068-14.491-54.873-22.15-86.189-22.15c-38.275,0-74.362,11.522-101.616,32.443 C15.441,137.664,0,166.525,0,197.406c0,27.813,12.723,54.284,35.936,75.01l0.395,67.755c0.02,3.536,1.814,6.968,4.961,8.58 c3.736,1.915,7.299,1.457,9.912,0.094l70.288-39.229c7.793,0.996,15.715,1.5,23.605,1.5c0.002,0,0.004,0,0.006,0 c22.85,0,45.271-4.194,65.465-12.174c7.369,14.116,18.396,27.029,32.719,38.024c27.254,20.921,63.342,32.442,101.617,32.442 c7.928,0,15.895-0.51,23.729-1.516l70.376,37.09c3.994,2.034,6.955,1.537,9.803-0.27c2.949-1.871,4.838-5.024,4.859-8.518 l0.395-65.485C477.277,309.984,490,283.511,490,255.699C490,224.818,474.559,195.958,446.52,174.433z M145.102,291.115 c-0.002,0-0.006,0-0.006,0c-8.143,0-16.324-0.602-24.314-1.786c-2.861-0.422-5.617,0.407-7.713,2.082L56.23,323.135l-0.32-55.185 c0.004-0.2,0-0.402-0.01-0.604c-0.131-2.81-1.438-5.435-3.604-7.231C31.471,242.833,20,220.562,20,197.406 c0-51.671,56.119-93.708,125.097-93.708c51.104,0,97.307,23.872,116.152,59.002c-6.324,3.5-12.334,7.413-17.963,11.733 c-28.039,21.524-43.48,50.385-43.48,81.266c0,8.404,1.154,16.657,3.383,24.656C185.337,287.409,165.442,291.115,145.102,291.115z M437.703,318.408c-2.164,1.796-3.471,4.423-3.602,7.232c-0.01,0.182-0.012,0.363-0.012,0.544l-0.32,53.429l-57.021-30.051 c-2.072-1.581-4.75-2.352-7.533-1.94c-7.992,1.186-16.172,1.787-24.313,1.787c-56.488,0-104.342-28.194-119.824-66.782 c-0.064-0.188-0.146-0.371-0.223-0.557c-3.281-8.369-5.051-17.218-5.051-26.371c0-33.247,23.238-62.503,58.182-79.141 c0.025-0.01,0.051-0.016,0.076-0.026c0.391-0.154,0.762-0.338,1.123-0.535c19.109-8.874,41.627-14.007,65.717-14.007 c68.978,0,125.097,42.038,125.097,93.709C470,278.854,458.529,301.125,437.703,318.408z"></path> <path d="M403.65,222.195H286.155c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10H403.65c5.521,0,10-4.477,10-10 C413.65,226.672,409.172,222.195,403.65,222.195z"></path> <path d="M403.65,267.469H286.155c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10H403.65c5.521,0,10-4.477,10-10 C413.65,271.946,409.172,267.469,403.65,267.469z"></path> </g> <g> <path d="M446.52,174.433c-27.254-20.921-63.341-32.443-101.616-32.443c-23.143,0-45.482,4.22-65.555,12.175 c-10.033-19.097-26.771-36.009-48.063-48.316c-25.068-14.491-54.873-22.15-86.189-22.15c-38.275,0-74.362,11.522-101.616,32.443 C15.441,137.664,0,166.525,0,197.406c0,27.813,12.723,54.284,35.936,75.01l0.395,67.755c0.02,3.536,1.814,6.968,4.961,8.58 c3.736,1.915,7.299,1.457,9.912,0.094l70.288-39.229c7.793,0.996,15.715,1.5,23.605,1.5c0.002,0,0.004,0,0.006,0 c22.85,0,45.271-4.194,65.465-12.174c7.369,14.116,18.396,27.029,32.719,38.024c27.254,20.921,63.342,32.442,101.617,32.442 c7.928,0,15.895-0.51,23.729-1.516l70.376,37.09c3.994,2.034,6.955,1.537,9.803-0.27c2.949-1.871,4.838-5.024,4.859-8.518 l0.395-65.485C477.277,309.984,490,283.511,490,255.699C490,224.818,474.559,195.958,446.52,174.433z M145.102,291.115 c-0.002,0-0.006,0-0.006,0c-8.143,0-16.324-0.602-24.314-1.786c-2.861-0.422-5.617,0.407-7.713,2.082L56.23,323.135l-0.32-55.185 c0.004-0.2,0-0.402-0.01-0.604c-0.131-2.81-1.438-5.435-3.604-7.231C31.471,242.833,20,220.562,20,197.406 c0-51.671,56.119-93.708,125.097-93.708c51.104,0,97.307,23.872,116.152,59.002c-6.324,3.5-12.334,7.413-17.963,11.733 c-28.039,21.524-43.48,50.385-43.48,81.266c0,8.404,1.154,16.657,3.383,24.656C185.337,287.409,165.442,291.115,145.102,291.115z M437.703,318.408c-2.164,1.796-3.471,4.423-3.602,7.232c-0.01,0.182-0.012,0.363-0.012,0.544l-0.32,53.429l-57.021-30.051 c-2.072-1.581-4.75-2.352-7.533-1.94c-7.992,1.186-16.172,1.787-24.313,1.787c-56.488,0-104.342-28.194-119.824-66.782 c-0.064-0.188-0.146-0.371-0.223-0.557c-3.281-8.369-5.051-17.218-5.051-26.371c0-52.682,56.998-93.709,125.098-93.709 S470,204.028,470,255.699C470,278.854,458.529,301.125,437.703,318.408z"></path> <path d="M403.65,222.195H286.155c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10H403.65c5.521,0,10-4.477,10-10 C413.65,226.672,409.172,222.195,403.65,222.195z"></path> <path d="M403.65,267.469H286.155c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10H403.65c5.521,0,10-4.477,10-10 C413.65,271.946,409.172,267.469,403.65,267.469z"></path> </g> </g> </g>
                                                </svg>          
                                            </div>
                                            <div onClick={() => dispatch(setConfigurationPanelState("showShoppingHistory")) }>
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{backgroundColor: configurationPanelState === "showShoppingHistory" ? "rgb(226 232 237)" : "transparent"}}
                                                    viewBox="0 0 115.35 122.88"><g><path d="M25.27,86.92c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h21.49c1.81,0,3.26,1.46,3.26,3.26s-1.46,3.26-3.26,3.26 H25.27L25.27,86.92L25.27,86.92z M61.1,77.47c-0.96,0-1.78-0.82-1.78-1.82c0-0.96,0.82-1.78,1.78-1.78h4.65c0.04,0,0.14,0,0.18,0 c1.64,0.04,3.1,0.36,4.33,1.14c1.37,0.87,2.37,2.19,2.92,4.15c0,0.04,0,0.09,0.05,0.14l0.46,1.82h39.89c1,0,1.78,0.82,1.78,1.78 c0,0.18-0.05,0.36-0.09,0.55l-4.65,18.74c-0.18,0.82-0.91,1.37-1.73,1.37l0,0l-29.18,0c0.64,2.37,1.28,3.65,2.14,4.24 c1.05,0.68,2.87,0.73,5.93,0.68h0.04l0,0h20.61c1,0,1.78,0.82,1.78,1.78c0,1-0.82,1.78-1.78,1.78H87.81l0,0 c-3.79,0.04-6.11-0.05-7.98-1.28c-1.92-1.28-2.92-3.46-3.92-7.43l0,0L69.8,80.2c0-0.05,0-0.05-0.04-0.09 c-0.27-1-0.73-1.69-1.37-2.05c-0.64-0.41-1.5-0.59-2.51-0.59c-0.05,0-0.09,0-0.14,0H61.1L61.1,77.47L61.1,77.47z M103.09,114.13 c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38s-4.38-1.96-4.38-4.38S100.67,114.13,103.09,114.13L103.09,114.13L103.09,114.13z M83.89,114.13c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38c-2.42,0-4.38-1.96-4.38-4.38S81.48,114.13,83.89,114.13 L83.89,114.13L83.89,114.13z M25.27,33.58c-1.81,0-3.26-1.47-3.26-3.26c0-1.8,1.47-3.26,3.26-3.26h50.52 c1.81,0,3.26,1.46,3.26,3.26c0,1.8-1.46,3.26-3.26,3.26H25.27L25.27,33.58L25.27,33.58z M7.57,0h85.63c2.09,0,3.99,0.85,5.35,2.21 s2.21,3.26,2.21,5.35v59.98h-6.5V7.59c0-0.29-0.12-0.56-0.31-0.76c-0.2-0.19-0.47-0.31-0.76-0.31l0,0H7.57 c-0.29,0-0.56,0.12-0.76,0.31S6.51,7.3,6.51,7.59v98.67c0,0.29,0.12,0.56,0.31,0.76s0.46,0.31,0.76,0.31h55.05 c0.61,2.39,1.3,4.48,2.23,6.47H7.57c-2.09,0-3.99-0.85-5.35-2.21C0.85,110.24,0,108.34,0,106.25V7.57c0-2.09,0.85-4,2.21-5.36 S5.48,0,7.57,0L7.57,0L7.57,0z M25.27,60.25c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h50.52c1.81,0,3.26,1.46,3.26,3.26 s-1.46,3.26-3.26,3.26H25.27L25.27,60.25L25.27,60.25z"></path></g>
                                                </svg>       
                                            </div>
                                            <div onClick={() => dispatch(setConfigurationPanelState("showPaymentMethods")) }>
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{backgroundColor: configurationPanelState === "showPaymentMethods" ? "rgb(226 232 237)" : "transparent"}}
                                                    viewBox="0 0 512 512"><g> <g> <g> <path d="M270.348,227.994H30.962C13.889,227.994,0,241.884,0,258.957v124.629c0,17.073,13.889,30.962,30.962,30.962h194.172 c4.736,0,8.575-3.839,8.575-8.575c0-4.736-3.839-8.575-8.575-8.575H30.962c-7.617,0-13.812-6.196-13.812-13.812v-61.331H284.16 v61.331c0,7.617-6.196,13.812-13.812,13.812h-16.632c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h16.632 c17.073,0,30.962-13.889,30.962-30.962V258.957C301.31,241.884,287.421,227.994,270.348,227.994z M284.161,305.105H17.15v-22.924 h51.353c4.736,0,8.575-3.839,8.575-8.575s-3.839-8.575-8.575-8.575H17.15v-6.074c0-7.617,6.196-13.812,13.812-13.812h239.386 c7.617,0,13.812,6.196,13.812,13.812v6.074H97.085c-4.736,0-8.575,3.839-8.575,8.575s3.839,8.575,8.575,8.575h187.077V305.105z"></path> </g> </g> <g> <g> <path d="M368.047,97.452H108.154c-4.736,0-8.575,3.839-8.575,8.575v100.177c0,4.736,3.839,8.575,8.575,8.575 c4.736,0,8.575-3.839,8.575-8.575v-39.387c27.007-3.792,48.425-25.209,52.216-52.216h199.102c4.736,0,8.575-3.839,8.575-8.575 C376.621,101.291,372.782,97.452,368.047,97.452z M116.729,149.438v-34.836h34.836 C148.108,132.136,134.264,145.98,116.729,149.438z"></path> </g> </g> <g> <g> <path d="M503.425,97.452H396.63c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h46.017 c3.791,27.006,25.203,48.424,52.204,52.216v71.5c-27.001,3.792-48.413,25.21-52.204,52.216H323.095 c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h180.33c4.736,0,8.575-3.839,8.575-8.575V106.027 C512,101.291,508.161,97.452,503.425,97.452z M494.85,149.437c-17.529-3.458-31.369-17.302-34.825-34.835h34.825V149.437z M494.85,290.533h-34.825c3.456-17.534,17.296-31.378,34.825-34.836V290.533z"></path> </g> </g> <g> <g> <path d="M305.79,141.389c-43.52,0-78.927,27.442-78.927,61.171c0,1.434,0.07,2.921,0.206,4.42 c0.429,4.716,4.601,8.186,9.317,7.763c4.716-0.429,8.192-4.601,7.763-9.317c-0.09-0.984-0.135-1.949-0.135-2.866 c0-24.273,27.713-44.022,61.777-44.022c34.07,0,61.789,19.748,61.789,44.022c-0.002,19.932-18.949,37.438-46.079,42.569 c-4.653,0.88-7.712,5.366-6.831,10.019c0.779,4.115,4.375,6.982,8.416,6.982c0.528,0,1.066-0.049,1.603-0.151 c35.35-6.687,60.039-31.121,60.039-59.419C384.729,168.831,349.317,141.389,305.79,141.389z"></path> </g> </g> <g> <g> <path d="M93.582,339.714H38.935c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h54.647 c4.736,0,8.575-3.839,8.575-8.575C102.156,343.554,98.317,339.714,93.582,339.714z"></path> </g> </g> </g>
                                                </svg>
                                            </div>
                                            <div onClick={() => dispatch(setConfigurationPanelState("showDeleteAccount")) }>
                                                <svg 
                                                    className="user-account-svg-mobile"
                                                    style={{backgroundColor: configurationPanelState === "showDeleteAccount" ? "rgb(226 232 237)" : "transparent"}}>
                                                    <g><path d="M16.7928932,19.5 L14.1464466,16.8535534 C13.9511845,16.6582912 13.9511845,16.3417088 14.1464466,16.1464466 C14.3417088,15.9511845 14.6582912,15.9511845 14.8535534,16.1464466 L17.5,18.7928932 L20.1464466,16.1464466 C20.3417088,15.9511845 20.6582912,15.9511845 20.8535534,16.1464466 C21.0488155,16.3417088 21.0488155,16.6582912 20.8535534,16.8535534 L18.2071068,19.5 L20.8535534,22.1464466 C21.0488155,22.3417088 21.0488155,22.6582912 20.8535534,22.8535534 C20.6582912,23.0488155 20.3417088,23.0488155 20.1464466,22.8535534 L17.5,20.2071068 L14.8535534,22.8535534 C14.6582912,23.0488155 14.3417088,23.0488155 14.1464466,22.8535534 C13.9511845,22.6582912 13.9511845,22.3417088 14.1464466,22.1464466 L16.7928932,19.5 Z M14.0425135,13.5651442 C13.4188979,13.8445863 12.7275984,14 12,14 C11.2738711,14 10.5838946,13.8452135 9.96126583,13.5668358 L5.87929558,15.4222768 C5.34380416,15.665682 5,16.1996113 5,16.7878265 L5,17.5 C5,18.3284271 5.67157288,19 6.5,19 L11.5,19 C11.7761424,19 12,19.2238576 12,19.5 C12,19.7761424 11.7761424,20 11.5,20 L6.5,20 C5.11928813,20 4,18.8807119 4,17.5 L4,16.7878265 C4,15.8074678 4.57300693,14.9175857 5.46549264,14.5119103 L8.92215823,12.9406987 C7.75209123,12.0255364 7,10.6005984 7,9 C7,6.23857625 9.23857625,4 12,4 C14.7614237,4 17,6.23857625 17,9 C17,10.5929224 16.2551051,12.0118652 15.0946468,12.927497 L17.6966094,14.0402775 C17.9505071,14.1488619 18.0683068,14.4427117 17.9597225,14.6966094 C17.8511381,14.9505071 17.5572883,15.0683068 17.3033906,14.9597225 L14.0425135,13.5651442 L14.0425135,13.5651442 Z M12,13 C14.209139,13 16,11.209139 16,9 C16,6.790861 14.209139,5 12,5 C9.790861,5 8,6.790861 8,9 C8,11.209139 9.790861,13 12,13 Z"></path> </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="user-account-profile-image-container">
                                            {
                                            userData["profile_image_tag"]
                                                ?   userData["profile_image_tag"].length > 3
                                                        ?   <img className="acccount-info-profile-image" src={require(`../../images/${userData["profile_image_tag"]}.webp`)}></img>
                                                        :   <img className="acccount-info-profile-image" src={require(`../../images/user.webp`)}></img>
                                                        
                                                :   <img className="acccount-info-profile-image" src={require(`../../images/user.webp`)}></img>
                                            }
                                        </div>
                                    </div>

                        }
                       
                        <div className="configuration-panel">
                            {
                                configurationPanelState === "showAccountInfo"
                                    ?   <AccountInfo />
                                    :   configurationPanelState === "showFavorites"
                                            ?   <AllFavorites />
                                            :   configurationPanelState === "showReviews"
                                                    ?   <Myreviews user_id={userId} />
                                                    :   configurationPanelState === "showShoppingHistory"
                                                            ?   <ShoppingHistory />
                                                            :   configurationPanelState === "showPaymentMethods"
                                                                    ?   <PaymentMethods />
                                                                    :   configurationPanelState === "showDeleteAccount"
                                                                            ?   <DeleteAccount />
                                                                            :   <></>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            
            : <></>
        
    )
}