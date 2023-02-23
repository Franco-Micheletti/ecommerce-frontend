function handleShowFilter(filter,filtersNames) {
    
    const svgSymbol = document.getElementById(filter+"toggle")
    svgSymbol.style.transform
                        ? svgSymbol.style = ""
                        : svgSymbol.style.transform = "rotate(180deg)"

    Object.keys(filtersNames[filter]).map( (attrKey) => {
        
        if (filter === "price") {

            let attribute = document.getElementById(filter)

            attribute.style.display === "inline-grid"
                ? attribute.style = "display: none"
                : attribute.style = "display: inline-grid; margin-left: 5px;"
        }
        else {

            let attribute = document.getElementById(filter+filtersNames[filter][attrKey])
            attribute.style.display === "inline-flex"
                ? attribute.style = "display: none"
                : attribute.style = "display: inline-flex; margin-left: 5px;"
        }
    })         
    }

export default handleShowFilter