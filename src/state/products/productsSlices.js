import { createSlice,current  } from "@reduxjs/toolkit";


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
        initialState:"",
        reducers:{
            setSearchedString: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }
)

export const appliedFiltersSlice = createSlice(
    {
        name:'appliedFiltersReducer',
        initialState:{},
        reducers:{
            addFilter: (state,action) =>{
                if (action.payload["filter_name"] !== "price"){
                    if (!state["features"]) {
                        state["features"] = {}
                    }
                    state["features"][action.payload["filter_name"]] = action.payload["filter_value"]
                }
                else {
                    state[action.payload["filter_name"]] = action.payload["filter_value"]
                }
                return state
            },
            removeFilter: (state,action) =>{
                delete state[action.payload["filter_name"]]
                return state
            },
            resetAppliedFiltersList: (state,action) =>{
                state = {}
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
                console.log(state)
                return state
            }
            
                    
            
        }
    }
)

// Export actions
export const {setProducts}            = productsSlice.actions
export const {setFilters}             = filtersSlice.actions
export const {setSearchMade}          = searchMadeSlice.actions
export const {setSearchedString}      = searchedStringSlice.actions
export const {setHomeProducts}        = homePageProductsSlice.actions
export const {addFilter,removeFilter,resetAppliedFiltersList} = appliedFiltersSlice.actions
export const {setUrlFiltersString}    = urlFiltersStringSlice.actions
// Export reducers
export const stringInputReducer      = searchedStringSlice.reducer
export const searchMadeReducer       =  searchMadeSlice.reducer
export const productsReducer         = productsSlice.reducer
export const filtersReducer          = filtersSlice.reducer
export const homeProductsReducer     = homePageProductsSlice.reducer
export const appliedFiltersReducer   = appliedFiltersSlice.reducer
export const urlFiltersStringReducer = urlFiltersStringSlice.reducer




