import { store } from "../state/store";
import { setSearchedString } from "../state/products/productsSlices";
import { setProducts } from "../state/products/productsSlices";
import { setFilters } from "../state/products/productsSlices";

export const fetchProductsByName = (string) => {
    
    store.dispatch(setSearchedString(string))
    
    fetch(`http://127.0.0.1:8000/products/product_name=${string}`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setProducts(data["products"]))
        store.dispatch(setFilters(data["filters"]))    
        }    
    )

} 