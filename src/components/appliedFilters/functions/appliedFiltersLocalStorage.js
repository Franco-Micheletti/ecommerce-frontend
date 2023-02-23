/**
 * Saves or gets a list to/from local storage using the provided key
 * Returns an empty array if there is no products in the local storage
 * 
 * 
 * ```key``` :  "" | String - The key that corresponds to the cart list.
 * 
 * ```product``` : {} | Object - The object to be added to the list
 * 
 * 
 * 
 */
export const appliedFiltersLocalStorage = (key,filter=null) => {

    // Get json of applied filters
    if ( key && !filter ){
        
        const appliedFilters = window.localStorage.getItem(key)
        if (appliedFilters !== null) {
            return JSON.parse(appliedFilters)
        } else {
            return {}
        }
        
        // Add a new filter to the applied filters
    } else if ( key && typeof filter === "object" && Array.isArray(filter) === false ) {
        
        if (window.localStorage.getItem(key)) {

            const appliedFilters = JSON.parse( window.localStorage.getItem(key))
            appliedFilters[key][filter["feature_name"]] = filter["feature_value"]
            window.localStorage.setItem(key,JSON.stringify(productsList))
        } 
            // If key doesn't exist in local storage we create it and then we add the product
        else {
            const productsList = []
            productsList.push(product)
            window.localStorage.setItem(key,JSON.stringify(productsList))

        }  
    }
    else {
        console.log("Local Storage Function: Applied Filters - Key was not provided or filter parameter is not an object.")
    }
    
    
}