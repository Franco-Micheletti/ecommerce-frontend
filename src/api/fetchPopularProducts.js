import { setPopularProductsForCart } from "../state/products/productsSlices"
import { store } from "../state/store"

export const fetchPopularProducts = () => {
    
    fetch(`http://127.0.0.1:8000/products/`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        console.log(data)
            store.dispatch(setPopularProductsForCart(data["products"]))
        }
    )
} 