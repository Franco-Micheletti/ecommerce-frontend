import { instance } from "axios"
import { useEffect } from "react"
import { axiosPrivateInstance } from "../axios/axios"

export const axiosPrivate = () => {
    
    useEffect(()=> {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer${accesstoken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivateInstance.interceptors.request.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (!prevRequest?.sent && (error?.response?.status === 401) || error?.response?.status === 403){

                    prevRequest.sent = true
                    // Set new tokens 
                }
            }
            
        )

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept)
            axiosPrivateInstance.interceptors.request.eject(responseIntercept)
        }
    },[])



    return axiosPrivate
}


