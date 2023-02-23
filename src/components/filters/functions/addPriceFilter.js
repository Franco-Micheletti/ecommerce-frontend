import { store } from "../../../state/store"
import { fetchAndApplyFilter } from "../../../api/fetchProductsByName"
import { setProducts,addFilter,setUrlFiltersString } from "../../../state/products/productsSlices"
import { Navigate } from "react-router-dom"

export  const addPriceFilter = async (e) => {
    if (e.button === 0) {

        const priceSlider = document.getElementById("price")
        priceSlider.removeEventListener("mouseup",addPriceFilter)
        
        console.log("BUTTON RELEASED , FETCHING")
        console.log("PRECIO MINIMO: ",store.getState().minPriceValueReducer)
        console.log("PRECIO MAXIMO: ",store.getState().maxPriceValueReducer)

        const filterToApplied = {
            "filter_name":"price",
            "filter_value":{"min":store.getState().minPriceValueReducer,
                            "max":store.getState().maxPriceValueReducer}
        }
        // Get applied filters
        store.dispatch(addFilter(filterToApplied))
        const appliedFilters = store.getState().appliedFiltersReducer
        // Get url string with filters
        store.dispatch(setUrlFiltersString(appliedFilters))
        const urlString = store.getState().urlFiltersStringReducer
        // Get search input
        const searchInput = store.getState().stringInputReducer
        console.log(urlString)
        const data = await fetchAndApplyFilter(searchInput,appliedFilters)
        if (data) {
            store.dispatch(setProducts(data["products"]))
        }

        Navigate(`/search=${searchInput}${urlString}`)
    }   

}
export const addMouseUpEvent = () => {

    const priceSlider = document.getElementById("price")
    priceSlider.addEventListener("mouseup",addPriceFilter)
    
}