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

export const { setReviewSubmitted } = reviewSubmittedSlice.actions
export const reviewSubmittedReducer = reviewSubmittedSlice.reducer