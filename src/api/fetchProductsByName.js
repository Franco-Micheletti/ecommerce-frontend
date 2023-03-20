import { store } from "../state/store";
import { setSearchedString, setTotalResults,setDataLoading } from "../state/products/productsSlices";
import { setProducts } from "../state/products/productsSlices";
import { setFilters } from "../state/products/productsSlices";
import { setPagesList } from "../state/pagination/paginationSlices";
import { setPage } from "../state/pagination/paginationSlices";
import { Navigate } from "react-router-dom";
export const fetchProductsByName = (string,page) => {
    
    store.dispatch(setSearchedString(string))
    store.dispatch(setPage(page))

    fetch(`http://127.0.0.1:8000/products/product_name=${string}&page=${page}`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } else if (response.status === 404 || response.status === 400 ){
                        return 0
                    }
                    }
    )
    .then( data => {
        if (data === 0 || data["match"] === 0) {
            store.dispatch(setDataLoading(false))
        } else {
            store.dispatch(setDataLoading(true))
            store.dispatch(setProducts(data["products"]))
            store.dispatch(setFilters(data["filters"]))  
            store.dispatch(setPagesList(data["pages"]))
            store.dispatch(setTotalResults(data["total_results"]))
        }
    }    
    )
    
} 

export const fetchAndApplyFilter = (searchInput,appliedFilters,page) => {
    
    store.dispatch(setPage(page))
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
            if ( !json["properties"]) {
                json["properties"] = {}
            }
            json["properties"][filter[0]] = filter[1]
        }
    })

    const filters = JSON.stringify(json)
    
    fetch(`http://127.0.0.1:8000/products/product_name=${searchInput}&filters=${filters}&page=${page}`)
    .then(response=> {
        if (response.status === 200 ) {
            return response.json()
        } else if (response.status === 404 ){
            return 0
        }
        }
    )
    .then(data => {
        
        if (data === 0 || data["match"] === 0) {
            store.dispatch(setDataLoading(false))
        } else {
            store.dispatch(setDataLoading(true))
            store.dispatch(setProducts(data["products"]))
            store.dispatch(setFilters(data["filters"]))  
            store.dispatch(setPagesList(data["pages"]))
            store.dispatch(setTotalResults(data["total_results"]))
        }
    }
    )
    
} 