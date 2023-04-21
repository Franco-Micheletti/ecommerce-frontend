import { store } from "../../../state/store"
import { removeFilter,setUrlFiltersString } from "../../../state/products/productsSlices"
import { history }  from "../../../utilities/customHistoryObject"
import { toggleFilterValues } from "../../filters/functions/toggleFilterValues"
import { createSearchParams } from "react-router-dom";

export const removeAppliedFilter = (filterToRemove,filtersNames,filters) => {

    // Update applied filters
    store.dispatch(removeFilter(filterToRemove))
    const appliedFilters = store.getState().appliedFiltersReducer
    // Update url
    store.dispatch(setUrlFiltersString(appliedFilters))
    const filterString   = store.getState().urlFiltersStringReducer
    // Get search input
    const searchInput = store.getState().stringInputReducer
    // Navigate
    if (filterString.length > 0) {
        var params = { q: searchInput, page: '1',filters:filterString}
    } else {
        var params = { q: searchInput, page: '1'}
    }
    
    history.navigate({
        pathname: '/search/',
        search: `?${createSearchParams(params)}`,
    });
    // Remove old filter selected css
    const filterName = filterToRemove["filter_name"]
    const propertiesValues = Object.keys(filters["filters"][filterName]).length
    
    for (let number = 0;number<propertiesValues;number++) {
        const otherButton = document.getElementById("label"+filterName+number)
        otherButton.style.backgroundColor = "transparent"
    }

    toggleFilterValues(filterName,filtersNames)

}