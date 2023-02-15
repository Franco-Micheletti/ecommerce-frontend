import { setHomeProducts } from "../state/products/productsSlices"
import { store } from "../state/store";

export const fetchAllProducts = () => {
    
    fetch(`http://127.0.0.1:8000/products/`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setHomeProducts(data["products"]))    
        }
    )
} 
