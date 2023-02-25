export const addSearchInputToLocalStorage = (string) => {
    
    if (!window.localStorage.getItem("search_data")) {
        
        window.localStorage.setItem("search_data",JSON.stringify({}))
    } 
    const searchData = JSON.parse(window.localStorage.getItem("search_data"))
    searchData["string_input"] = string
    window.localStorage.setItem("search_data",JSON.stringify(searchData))
}

export const getStringInputFromLocalStorage = () => {

    if (window.localStorage.getItem("search_data")) {
        const searchData = JSON.parse(window.localStorage.getItem("search_data"))
        if (searchData["string_input"]) {
            return searchData["string_input"]
        } else {
            return ""
        }
    } else {
        return ""
    }
}