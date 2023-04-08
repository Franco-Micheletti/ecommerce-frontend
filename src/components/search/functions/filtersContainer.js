


export const getElements = () => {
   
    const filtersContainer = document.getElementById("filters-container")
    const blackBackground  = document.getElementById("toggle-filter-black-background")
    
    return [filtersContainer,blackBackground]
    
}

export const toggleFiltersContainer = () => {
    
    const filtersContainer = getElements()[0]
    const blackBackground  = getElements()[1]
    
    const displayStyle = filtersContainer.style.display
    document.body.style.position = "fixed"
    
    if ( displayStyle === "block" ) {

        filtersContainer.style.display = "none"
        filtersContainer.style.marginLeft = "-320px"
        blackBackground.style.opacity = 0
        blackBackground.style.position = "static"

    } else {
        
        filtersContainer.style.display = "block"
        filtersContainer.style.backgroundColor = "white"
        setTimeout( () => {
            filtersContainer.style.marginLeft = "1%"
            filtersContainer.style.left = "1%"
        },20)
        blackBackground.style.opacity = 0.50
        blackBackground.style.position = "absolute"
        blackBackground.addEventListener("click",() => clickOutsideContainer(),false)
        blackBackground.removeEventListener("click",() => clickOutsideContainer(),false)
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
