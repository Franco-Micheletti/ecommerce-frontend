import { createSlice  } from "@reduxjs/toolkit";


export const specificProductSlice = createSlice(

    {
        name:'specificProductReducer',
        initialState: null,
        reducers:{
            setProduct: (state,action) =>{
                state = action.payload
                return state
            },
        }
    }

)

export const userReviewSlice = createSlice(

    {
        name:'userReviewReducer',
        initialState: {"text":"",
                       "score":""},
        reducers:{
            setReviewText: (state,action) =>{
                state["text"] = action.payload
                return state
            },
            setReviewScore: (state,action) =>{
                state["score"] = action.payload
                return state
            }
        }
    }
)


export const {setProduct}   = specificProductSlice.actions
export const specificProductReducer = specificProductSlice.reducer

export const {setReviewText,setReviewScore}   = userReviewSlice.actions
export const userReviewReducer = userReviewSlice.reducer