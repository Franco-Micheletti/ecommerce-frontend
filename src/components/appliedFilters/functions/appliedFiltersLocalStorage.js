/**
 * Saves or gets a list to/from local storage using the provided key
 * Returns an empty array if there is no products in the local storage
 * 
 * ```key(String)```
 * 
 * The key that will be stored inside "applied_filters" key. 
 * This key can be either "features" or "price" or any other filter that the search item may have
 * 
 * ```filter(Object)```  
 * ```json
 * {"filter_name":"name",
 *  "filter_value":"value"}
 * ```
 * Contains the data used to add the filter to the local storage.
 * 
 * ```remove(Boolean)```
 * 
 * true if you want to remove a filter or false if you want to a add filter
 */
export const appliedFiltersLocalStorage = (key,remove,filter=null) => {
    if ( key && remove !== null && filter ) {
        
        if (window.localStorage.getItem("applied_filters")) {
            
            const appliedFiltersInLocalStorage = window.localStorage.getItem("applied_filters")
            const appliedFilters = JSON.parse(appliedFiltersInLocalStorage)

            if (remove === false ) {
                if ( typeof filter === "object" && Array.isArray(filter) === false ) {
                    if (!appliedFilters[key]) {
                        appliedFilters[key] = {}
                    }
                    appliedFilters[key][filter["filter_name"]] = filter["filter_value"]
                    window.localStorage.setItem("applied_filters",JSON.stringify(appliedFilters))
                    
                    
                } else {
                    console.error("Error inside Local Storage Function: Applied Filters - Filter parameter is not an object")
                }
                
            } else {
                delete appliedFilters[key][filter["filter_name"]]
                window.localStorage.setItem("applied_filters",JSON.stringify(appliedFilters))
            }
        }   // If key doesn't exist in local storage we create it and then we add the filter
        else {

            if (remove === false) {
                const appliedFilters = {}
                appliedFilters[key] = {}
                appliedFilters[key][filter["filter_name"]] = filter["filter_value"]
                window.localStorage.setItem("applied_filters",JSON.stringify(appliedFilters))
            } else {
                console.error("Error inside Local Storage Function: Applied Filters - There is no filters to remove!")
            }
            
        }  
    }
    else {
        console.error("Error inside Local Storage Function: Applied Filters - Invalid parameters or null values\n"
                        +"KEY:"+key+"\nREMOVE:"+remove+"\nFILTER"+filter)
    }
    
    
}

export const getAllAppliedFilters = () => {
    const allAppliedFilters = window.localStorage.getItem("applied_filters")
    if (allAppliedFilters) {
        return JSON.parse(allAppliedFilters)
    } else {
        return {}
    }
}