import { setProduct } from "../state/specificProduct/productsSlices"
import {store} from "../state/store"

export const fetchOneProduct = (productId) => {
    
    fetch(`http://127.0.0.1:8000/product/id=${productId}`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setProduct(data))   
        }
    )
} 