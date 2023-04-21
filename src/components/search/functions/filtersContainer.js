import { store } from "../../../state/store"
import { setShowMobileFilterContainer } from "../../../state/filters/filtersSlices"
import { appliedFiltersReducer } from "../../../state/products/productsSlices"

export const getElements = () => {
   
    const filtersContainer = document.getElementById("filters-container")
    const blackBackground  = document.getElementById("toggle-filter-black-background")
    
    return [filtersContainer,blackBackground]
    
}

export const toggleFiltersContainer = () => {
    
    const filtersContainer = getElements()[0]
    const blackBackground  = getElements()[1]
    const appliedFilters = store.getState().appliedFiltersReducer
    console.log(appliedFilters)
    const showMobileFilterContainer = store.getState().showMobileFilterContainerReducer
    
    if ( showMobileFilterContainer === true ) {
        store.dispatch(setShowMobileFilterContainer(false))
        filtersContainer.style.marginLeft = "-320px"
        blackBackground.style.position = "static"
        document.body.style.position = "static"
    } else {
        store.dispatch(setShowMobileFilterContainer(true))
        setTimeout(() => {
            document.body.style.position = "fixed"
            blackBackground.style.position = "absolute"
            blackBackground.addEventListener("click",clickOutsideContainer,{once:true})
        }, 50);
        
    }
    
}

export const clickOutsideContainer = () => {
    const filtersContainer = getElements()[0]
    const blackBackground  = getElements()[1]

    filtersContainer.style.display = "none"
    filtersContainer.style.marginLeft = "-320px"
    blackBackground.style.position = "static"
    store.dispatch(setShowMobileFilterContainer(false))
}
