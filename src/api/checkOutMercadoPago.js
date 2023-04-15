import {store} from "../state/store"

export const checkOutMercadoPago = async (itemsList) => {

    if (process.env.REACT_APP_PRODUCTION === 'true'){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }
    
    const response = await fetch(`${url}/checkout/mercadopago`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"items":itemsList}) 
    })
    .then(response => {
        if (response.status === 200 ) {
            return response.json()
        } 
        }
    )
    .then(data => {
        return data
        }
    )

    return response
} 