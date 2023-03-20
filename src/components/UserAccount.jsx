import React,{useEffect} from "react"

export const UserAccount = ()=> {

    useEffect(() => {
    
        const response = fetch(`http://127.0.0.1:8000/refresh_token/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            
            }).then((response)=>{
                if (response.status === 200) {
                    return response.json()
                }
            })
        
        return () => {
            
        }

    }, [])
    


    return (

        <div>USER ACCOUNT</div>
    )
}