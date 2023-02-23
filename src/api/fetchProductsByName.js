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

export const fetchAndApplyFilter = (searchInput,appliedFilters) => {
    
    var urlStr = appliedFilters
    
    var json = {}
    
    const strList = urlStr.split("&")

    strList.forEach( (filter,index) => {
        strList[index] = filter.split("=")
    })
    strList.splice(0,1)
    strList.forEach( (filter,index) => {
        if (filter[0] === "min_price" || filter[0] === "max_price") {
            if ( !json["price"]) {
                json["price"] = {}
            }
            json["price"][filter[0]] = filter[1]
        } else {
            if ( !json["features"]) {
                json["features"] = {}
            }
            json["features"][filter[0]] = filter[1]
        }
    })

    const filters = JSON.stringify(json)
    
    fetch(`http://127.0.0.1:8000/products/product_name=${searchInput}&filters=${filters}`)
    .then(response=> {
        if(response.status === 200) {
            return response.json()
        }}
    )
    .then(data => {
        store.dispatch(setProducts(data["products"]))
        store.dispatch(setFilters(data["filters"]))
        }  
    )
    
} 