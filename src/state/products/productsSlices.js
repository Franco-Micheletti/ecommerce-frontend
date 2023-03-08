import { createSlice  } from "@reduxjs/toolkit";
import { appliedFiltersLocalStorage,getAllAppliedFilters } from "../../components/appliedFilters/functions/appliedFiltersLocalStorage";
import { getStringInputFromLocalStorage,addSearchInputToLocalStorage} from "../../components/navbar/functions/searchStringLocalStorage";

export const productsSlice = createSlice(

    {
        name:'productsReducer',
        initialState: null,
        reducers:{
            setProducts: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)

export const homePageProductsSlice = createSlice(

    {
        name:'homeProductsReducer',
        initialState: null,
        reducers:{
            setHomeProducts: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)


export const popularProductsForCartSlice = createSlice(

    {
        name:'popularProductsReducer',
        initialState: null,
        reducers:{
            setPopularProductsForCart: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)

export const filtersSlice = createSlice(
    {
        name:'filtersReducer',
        initialState: null,
        reducers:{
            setFilters: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)

export const searchMadeSlice = createSlice(
    {
        name:'searchMadeReducer',
        initialState:false,
        reducers:{
            setSearchMade: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)
export const searchedStringSlice = createSlice(
    {
        name:'stringInputReducer',
        initialState: getStringInputFromLocalStorage(),
        reducers:{
            setSearchedString: (state,action) =>{
                addSearchInputToLocalStorage(action.payload)
                state = action.payload
                return state
            },
        }
    }
)

export const appliedFiltersSlice = createSlice(
    {
        name:'appliedFiltersReducer',
        initialState: getAllAppliedFilters(),
        reducers:{
            addFilter: (state,action) =>{
                if (action.payload["filter_name"] !== "price"){
                    if (!state["features"]) {
                        state["features"] = {}
                    }
                    
                    appliedFiltersLocalStorage("features",false,action.payload)
                    state["features"][action.payload["filter_name"]] = action.payload["filter_value"]
                }
                else {
                    appliedFiltersLocalStorage(action.payload["filter_name"],false,action.payload)
                    state[action.payload["filter_name"]] = action.payload["filter_value"]
                }
                return state
            },
            removeFilter: (state,action) =>{
                if (action.payload["filter_name"] !== "price") {
                    if (state["features"]) {
                        if (state["features"][action.payload["filter_name"]]) {
                            delete state["features"][action.payload["filter_name"]]
                        }
                        else {
                            console.Error("Filter name doesn't exist")
                        }
                    }
                    appliedFiltersLocalStorage("features",true,action.payload)
                    return state
                } else {
                    if (state[action.payload["filter_name"]]) {
                        delete state[action.payload["filter_name"]]
                        appliedFiltersLocalStorage(action.payload["filter_name"],true,action.payload)
                    }
                }
                
            },
            resetAppliedFiltersList: (state,action) =>{
                state = {}
                window.localStorage.setItem("applied_filters",JSON.stringify({}))
                return state
            }
        }
        
    }
)

export const urlFiltersStringSlice = createSlice(
    {
        name:'urlFiltersString',
        initialState:"",
        reducers:{
            setUrlFiltersString: (state,action) =>{
                var filtersApplied = action.payload
                state = ""
                if (filtersApplied["features"]) {
                    Object.keys(filtersApplied["features"]).forEach( (key,index) => {
                        state += "&"+key+"="+filtersApplied["features"][key]
                    });
                }
                if ( filtersApplied["price"]) {
                    state += "&"+"min_price="+filtersApplied["price"]["min_price"]+"&"+"max_price="+filtersApplied["price"]["max_price"]
                }
                return state
            }  
        }
    }
)

export const dataLoadingSlice = createSlice(

    {
        name:'dataLoading',
        initialState:false,
        reducers:{
            setDataLoading: (state,action) =>{
                state = action.payload
                return state
            }  
        }
    }
)

export const totalResultsSlice = createSlice (

    {
        name:'totalResults',
        initialState:0,
        reducers:{
            setTotalResults: (state,action) =>{
                state = action.payload
                return state
            }  
        }
    }


)

// Export actions
export const {setProducts}               = productsSlice.actions
export const {setFilters}                = filtersSlice.actions
export const {setSearchMade}             = searchMadeSlice.actions
export const {setSearchedString}         = searchedStringSlice.actions
export const {setHomeProducts}           = homePageProductsSlice.actions
export const {addFilter,removeFilter,resetAppliedFiltersList} = appliedFiltersSlice.actions
export const {setUrlFiltersString}       = urlFiltersStringSlice.actions
export const {setDataLoading}            = dataLoadingSlice.actions
export const {setPopularProductsForCart} = popularProductsForCartSlice.actions
export const {setTotalResults}           = totalResultsSlice.actions
// Export reducers
export const popularProductsForCartReducer  = popularProductsForCartSlice.reducer
export const stringInputReducer             = searchedStringSlice.reducer
export const searchMadeReducer              = searchMadeSlice.reducer
export const productsReducer                = productsSlice.reducer
export const filtersReducer                 = filtersSlice.reducer
export const homeProductsReducer            = homePageProductsSlice.reducer
export const appliedFiltersReducer          = appliedFiltersSlice.reducer
export const urlFiltersStringReducer        = urlFiltersStringSlice.reducer
export const dataLoadingReducer             = dataLoadingSlice.reducer
export const totalResultsReducer            = totalResultsSlice.reducer


