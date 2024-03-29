export const toggleFilterValues = (filter,filtersNames) => {
    
    // Rotate svg
    const svgSymbol = document.getElementById(filter+"toggle")
    if (svgSymbol.style.transform) {
        svgSymbol.style.transform === "none"
                ?   svgSymbol.style.transform = "rotate(180deg)"
                :   svgSymbol.style.transform = "none"
    }
    // Remove border
    const filterContainer = document.getElementById(filter)

    filterContainer.style.borderBottom === "0.1px solid rgb(96, 96, 96)"
        ?filterContainer.style.borderBottom = "none" 
        :filterContainer.style.borderBottom = "0.1px solid rgb(96, 96, 96)"
    
    if (filter === "price") {
        let attribute = document.getElementById(filter+"slider")
        attribute.style.display === "inline-grid"
            ? attribute.style = "display: none"
            : attribute.style = "display: inline-grid; margin-left: 5px;"
    } else {
        // Toggle hide or show filter attributes
        Object.keys(filtersNames[filter]).forEach( (attrKey) => {

            let attribute = document.getElementById(filter+filtersNames[filter][attrKey])
            attribute.style.display === "inline-flex"
                ? attribute.style = "display: none"
                : attribute.style = "display: inline-flex; margin-left: 5px;"   
            }
        )}  
    }
          

