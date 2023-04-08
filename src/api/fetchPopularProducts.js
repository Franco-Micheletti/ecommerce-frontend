import { setPopularProductsForCart } from "../state/products/productsSlices"
import { store } from "../state/store"

export const fetchPopularProducts = () => {

    if (process.env.PRODUCTION === true){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }
    
    fetch(`${url}/products/home`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        
            store.dispatch(setPopularProductsForCart(data))
        }
    )
} 