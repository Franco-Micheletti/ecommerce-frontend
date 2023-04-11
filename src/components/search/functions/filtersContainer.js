import { store } from "../../../state/store"
import { setShowMobileFilterContainer } from "../../../state/filters/filtersSlices"

export const getElements = () => {
   
    const filtersContainer = document.getElementById("filters-container")
    const blackBackground  = document.getElementById("toggle-filter-black-background")
    
    return [filtersContainer,blackBackground]
    
}

export const toggleFiltersContainer = () => {
    
    const filtersContainer = getElements()[0]
    const blackBackground  = getElements()[1]
    
    const showMobileFilterContainer = store.getState().showMobileFilterContainerReducer
    
    if ( showMobileFilterContainer === true ) {
        store.dispatch(setShowMobileFilterContainer(false))
        filtersContainer.style.marginLeft = "-320px"
        blackBackground.style.opacity = 0
        blackBackground.style.position = "static"
        document.body.style.position = "static"
    } else {
        store.dispatch(setShowMobileFilterContainer(true))
        setTimeout(() => {
            document.body.style.position = "fixed"
            filtersContainer.style.marginLeft = "auto"
            blackBackground.style.opacity = 0.50
            blackBackground.style.position = "absolute"
            blackBackground.addEventListener("click",() => clickOutsideContainer(),false)
            blackBackground.removeEventListener("click",() => clickOutsideContainer(),false)
        }, 50);
        
    }
    
}


export const clickOutsideContainer = () => {

    const filtersContainer = getElements()[0]
    const blackBackground  = getElements()[1]

    filtersContainer.style.display = "none"
    filtersContainer.style.marginLeft = "-320px"
    blackBackground.style.opacity = 0
    blackBackground.style.position = "static"

}
