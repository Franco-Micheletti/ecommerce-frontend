import { store } from "../../../state/store"
import { addFilter,setUrlFiltersString } from "../../../state/products/productsSlices"
import { history } from "../../../utilities/customHistoryObject"
import { createSearchParams } from "react-router-dom"

export  const addPriceFilter = (e) => {
    if (e.button === 0) {

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

        // Navigate
        const params = { q: searchInput, page: '1',filters:urlString}
        history.navigate({
            pathname: '/search/',
            search: `?${createSearchParams(params)}`,
        })
    }   

}
