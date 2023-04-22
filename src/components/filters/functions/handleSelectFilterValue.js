import { store } from "../../../state/store"
import { history }  from "../../../utilities/customHistoryObject"
import { createSearchParams } from "react-router-dom";
import { removeAppliedFilter } from "../../appliedFilters/functions/removeAppliedFilter";
import { addFilter,setUrlFiltersString } from "../../../state/products/productsSlices";

export const handleFilterClick = (filterToApply) => {
    // Check if the same filter already exist, if so remove it
    const appliedFiltersList = store.getState().appliedFiltersReducer
    if (
         appliedFiltersList.hasOwnProperty("properties") && 
         appliedFiltersList["properties"].hasOwnProperty(filterToApply["filter_name"]) === true && 
         filterToApply["filter_value"] === appliedFiltersList["properties"][filterToApply["filter_name"]]
        ) {
            removeAppliedFilter(filterToApply)
    } else {
        // Set body back to static
        document.body.style.position = "static"
        // Add filter to the filters applied list
        store.dispatch(addFilter(filterToApply))
        const appliedFilters = store.getState().appliedFiltersReducer
        // Update url filter string
        store.dispatch(setUrlFiltersString(appliedFilters))
        const filterString = store.getState().urlFiltersStringReducer
        // Get search input current state
        const searchInput  = store.getState().stringInputReducer
        // Navigate
        const params = { q: searchInput, page: '1',filters:filterString}
        history.navigate({
            pathname: '/search/',
            search: `?${createSearchParams(params)}`,
        })
        
    }
}