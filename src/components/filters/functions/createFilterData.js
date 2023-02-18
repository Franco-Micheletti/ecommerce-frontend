function createFilterData(filters) {

    if(filters["filters"]) { 
    
        var filtersNames = {}

        Object.keys(filters["filters"])?.map( (filterKeyName) => {
            
            filtersNames[filterKeyName] = []
            
            Object.keys(filters["filters"][filterKeyName])?.map( (values) => {

                filtersNames[filterKeyName].push(values)
            })
        })
        
        return filtersNames
    }
    
}

export default createFilterData