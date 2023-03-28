import { setProduct } from "../state/specificProduct/productsSlices"
import { setVariantOption } from "../state/variants/variantsSlices"
import {store} from "../state/store"

export const fetchOneProduct = (productId) => {
    
    fetch(`http://127.0.0.1:8000/product/id=${productId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setProduct(data))
        store.dispatch(setVariantOption(data))
        }
    )
} 