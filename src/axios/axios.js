import axios from 'axios'

const API_URL = "Http://127.0.0.1:8000/"

export const axiosInstance = axios.create({

    baseURL: API_URL,
    withCredential:true,
    headers: {"Content-Type":"application/json"}
})

export const axiosPrivateInstance = axios.create({

    baseURL: API_URL,
    withCredential:true,
    headers: {"Content-Type":"application/json"}
})
