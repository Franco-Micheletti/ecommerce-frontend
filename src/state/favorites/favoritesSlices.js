import { createSlice } from "@reduxjs/toolkit";

export const favoritesListSlice = createSlice(

    {
        name:'favoritesListReducer',
        initialState: [],
        reducers:{
            addToFavorite: (state,action) =>{
                state.push(action.payload)
                return state
            },
            setFavoritesList: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const favoritesIconChangeListSlice = createSlice(

    {
        name:'favoritesIconChangeListReducer',
        initialState: [],
        reducers:{
            addToFavorite: (state,action) =>{
                state.push(action.payload)
                return state
            },
            setFavoritesIconChangeList: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const showFavoritesPreviewSlice = createSlice(

    {
        name:'showFavoritesPreviewReducer',
        initialState: false,
        reducers:{
            setShowFavoritesPreview: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const favoritesListReducer             = favoritesListSlice.reducer
export const favoritesIconChangeListReducer   = favoritesIconChangeListSlice.reducer
export const showFavoritesPreviewReducer      = showFavoritesPreviewSlice.reducer

export const {setShowFavoritesPreview}        = showFavoritesPreviewSlice.actions
export const {addToFavorite,setFavoritesList} = favoritesListSlice.actions
export const {setFavoritesIconChangeList}     = favoritesIconChangeListSlice.actions


