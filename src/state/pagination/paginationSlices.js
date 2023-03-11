import { createSlice } from "@reduxjs/toolkit";

export const pagesListSlice = createSlice(

    {
        name:'pagesListReducer',
        initialState: [],
        reducers:{
            setPagesList: (state,action) =>{
                state = action.payload
                return state
            }

        }
    }
)

export const pageSlice = createSlice(

    {
        name:'pageReducer',
        initialState: "1",
        reducers:{
            setPage: (state,action) =>{
                state = action.payload
                return state
            }
            
        }
    }
)

// Reducers

export const pagesListReducer = pagesListSlice.reducer
export const pageReducer      = pageSlice.reducer

// Actions

export const {setPagesList} = pagesListSlice.actions
export const {setPage}      = pageSlice.actions
