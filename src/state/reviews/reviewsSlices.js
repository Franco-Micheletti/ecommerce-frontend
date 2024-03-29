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
        initialState: false,
        reducers:{
            setUpdateReview: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const userAccountAllReviewsSlice = createSlice(

    {
        name:'userAccountAllReviewsReducer',
        initialState: [],
        reducers:{
            setUserAccountAllReviews: (state,action) =>{
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

export const { setUpdateReview } = updateReviewSlice.actions
export const updateReviewReducer = updateReviewSlice.reducer

export const { setUserAccountAllReviews } = userAccountAllReviewsSlice.actions
export const userAccountAllReviewsReducer = userAccountAllReviewsSlice.reducer