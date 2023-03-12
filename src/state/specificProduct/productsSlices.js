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
export const {setProduct}   = specificProductSlice.actions
export const specificProductReducer = specificProductSlice.reducer
