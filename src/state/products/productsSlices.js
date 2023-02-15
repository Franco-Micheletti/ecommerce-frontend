import { createSlice } from "@reduxjs/toolkit";

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

// Export actions
export const {setProducts}       = productsSlice.actions
export const {setFilters}        = filtersSlice.actions
export const {setSearchMade}     = searchMadeSlice.actions
export const {setSearchedString} = searchedStringSlice.actions
export const {setHomeProducts}   = homePageProductsSlice.actions
// Export reducers
export const stringInputReducer  = searchedStringSlice.reducer
export const searchMadeReducer   = searchMadeSlice.reducer
export const productsReducer     = productsSlice.reducer
export const filtersReducer      = filtersSlice.reducer
export const homeProductsReducer = homePageProductsSlice.reducer





