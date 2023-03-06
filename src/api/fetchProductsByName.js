import { store } from "../state/store";
import { setSearchedString } from "../state/products/productsSlices";
import { setProducts } from "../state/products/productsSlices";
import { setFilters } from "../state/products/productsSlices";
import { setPagesList } from "../state/pagination/paginationSlices";

export const fetchProductsByName = (string) => {
    
    store.dispatch(setSearchedString(string))
    const page = store.getState().pageReducer

    fetch(`http://127.0.0.1:8000/products/product_name=${string}&page=${page}`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setProducts(data["products"]))
        store.dispatch(setFilters(data["filters"]))    
        store.dispatch(setPagesList(data["pages"]))
        }    
    )

} 

export const fetchAndApplyFilter = (searchInput,appliedFilters) => {
    
    const page = store.getState().pageReducer
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
    
    fetch(`http://127.0.0.1:8000/products/product_name=${searchInput}&filters=${filters}&page=${page}`)
    .then(response=> {
        if(response.status === 200) {
            return response.json()
        }}
    )
    .then(data => {
        store.dispatch(setProducts(data["products"]))
        store.dispatch(setFilters(data["filters"]))
        store.dispatch(setPagesList(data["pages"]))
        }  
    )
    
} 