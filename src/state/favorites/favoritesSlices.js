import { createSlice } from "@reduxjs/toolkit";

export const favoritesListSlice = createSlice(

    {
        name:'favoritesListReducer',
        initialState: [],
        reducers:{
            addToFavorite: (state,action) =>{
                state.push(action.payload)
                return state
            }

        }
    }
)


export const favoritesListReducer = favoritesListSlice.reducer
export const {addToFavorite}      = favoritesListSlice.actions


