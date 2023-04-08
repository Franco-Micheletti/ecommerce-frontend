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

export const UserAccount = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const configurationPanelState = useSelector(store => store.configurationPanelReducer)
    const userData = useSelector((store) => store.userDataReducer)
    const [userId,setUserId] = useState(null)
    const [isAuthorized,setIsAuthorized] = useState(false)
    const userCredentials = store.getState().userCredentialsReducer

    useEffect( () => {

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

                        <div className="manage-account-options">
                            <div onClick={() => dispatch(setConfigurationPanelState("showAccountInfo")) }       className={configurationPanelState === "showAccountInfo" ? "active-option account-options-item " : "account-options-item" }><label>Account Info</label></div>
                            <div onClick={() => dispatch(setConfigurationPanelState("showFavorites")) }         className={configurationPanelState === "showFavorites" ? "account-options-item active-option" : "account-options-item" }    ><label>My Favorites</label></div>
                            <div onClick={() => dispatch(setConfigurationPanelState("showReviews")) }           className={configurationPanelState === "showReviews" ? "account-options-item active-option" : "account-options-item" }><label>My Reviews</label></div>
                            <div onClick={() => dispatch(setConfigurationPanelState("showShoppingHistory")) }   className={configurationPanelState === "showShoppingHistory" ? "account-options-item active-option" : "account-options-item" }><label>Shopping history</label></div>
                            <div onClick={() => dispatch(setConfigurationPanelState("showPaymentMethods")) }    className={configurationPanelState === "showPaymentMethods" ? "account-options-item active-option" : "account-options-item" }><label>Payment Methods</label></div>
                            <div onClick={() => dispatch(setConfigurationPanelState("showDeleteAccount")) }     className={configurationPanelState === "showDeleteAccount" ? "active-option account-options-item" : "account-options-item" }><label>Delete Account</label></div>
                        </div>
                        <div className="configuration-panel">
                            {
                                configurationPanelState === "showAccountInfo"
                                    ?   <AccountInfo  />
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