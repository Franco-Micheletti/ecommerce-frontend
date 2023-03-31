import { createSlice  } from "@reduxjs/toolkit";


export const reviewSubmittedSlice = createSlice(

    {
        name:'reviewSubmittedReducer',
        initialState: false,
        reducers:{
            setReviewSubmitted: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const reviewErrorSlice = createSlice(

    {
        name:'reviewErrorReducer',
        initialState: null,
        reducers:{
            setReviewError: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const updateReviewSlice = createSlice(

    {
        name:'updateReviewReducer',
        initialState: null,
        reducers:{
            setReviewUpdate: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const { setReviewSubmitted } = reviewSubmittedSlice.actions
export const reviewSubmittedReducer = reviewSubmittedSlice.reducer

export const { setReviewError } = reviewErrorSlice.actions
export const reviewErrorReducer = reviewErrorSlice.reducer

export const { setReviewError } = reviewErrorSlice.actions
export const reviewErrorReducer = reviewErrorSlice.reducer