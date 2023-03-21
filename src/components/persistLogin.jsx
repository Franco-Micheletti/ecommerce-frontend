import React,{useEffect,useState} from "react";
import { Outlet } from "react-router-dom";
import { getNewAccessToken } from "../api/useRefreshToken";
import { store } from "../state/store";
import { userCredentialsReducer } from "../state/user/userSlices";

export const PersistLogin = () => {

    const [loading,setLoading] = useState()
    
    useEffect( ()=> {

        let isMounted = true
        const userCredentials = store.getState().userCredentialsReducer
        
        async function verifyUser(){
            try {
                await getNewAccessToken()
            } catch (error) {
                
            } finally {
                isMounted && setLoading(false)
            }
        }
        
        !userCredentials["jwt_refresh"] ? verifyUser() : setLoading(false)
        
        return () => {
            isMounted = false
        }

    },[])

    return (
        loading ? "loading..." : <Outlet />
    )

}