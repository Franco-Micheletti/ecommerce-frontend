import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux"

export const AccountInfo = ()=> {

    const userData = useSelector((store) => store.userDataReducer)
    // Screen width
    let [screenWidth,setScreenWidth] = useState(window.innerWidth > 0 ? window.innerWidth : Screen.width)
    useEffect(() => {
        setScreenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width
    }, [])

    return (
        
        <div className="account-info-page"> 
           <div className="user-account-image-big-res">
                {   
                    screenWidth > 950
                        ?   userData["profile_image_tag"]
                                ?   userData["profile_image_tag"].length > 3
                                        ?   <img className="acccount-info-profile-image" src={require(`../../../images/${userData["profile_image_tag"]}.webp`)}></img>
                                        :   <img className="acccount-info-profile-image" src={require(`../../../images/user.webp`)}></img>
                                        
                                :   <img className="acccount-info-profile-image" src={require(`../../../images/user.webp`)}></img>
                        :   <></>
                    
                }
            </div>
            <div className="account-management-data">
                <label>First name</label><input disabled={true} value={userData["first_name"]}></input>
                <label>Last name</label><input disabled={true} value={userData["last_name"]}></input>
                <label>Email</label><input disabled={true} value={userData["email"]}></input>
                <label>Phone</label><input disabled={true} value={userData["phone"]}></input>
                <button className="update-info-button">Change My Account Data</button>
                <label>Change Password</label>
                <input disabled={true} value={"New Password"}></input>
                <input disabled={true} value={"Confirm Password"}></input>
                <button className="update-info-button">Update My Password</button>
            </div>
        </div>
    )
}