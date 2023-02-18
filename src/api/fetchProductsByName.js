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

export const fetchAndApplyFilter = async (searchInput,appliedFilters) => {
    
    const filters = JSON.stringify(appliedFilters)
    store.dispatch(setSearchedString(searchInput))
    
    const data = await fetch(`http://127.0.0.1:8000/products/product_name=${searchInput}&filters=${filters}`)
    const dataJson = await data.json()
    return dataJson;
    
} 