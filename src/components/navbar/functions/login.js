
export const login = async ({username,password}) => {
    
    const jsonObject = fetch(`http://127.0.0.1:8000/login/`, {
        method: 'POST',
        credentials:'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"username":username,
                              "password":password})
    }).then((response)=>{
        if (response.status === 200) {
            return response.json()
        }
    })

    
    
    return jsonObject
} 