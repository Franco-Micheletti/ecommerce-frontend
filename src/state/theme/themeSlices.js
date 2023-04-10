import { createSlice  } from "@reduxjs/toolkit";

export const selectedThemeSlice = createSlice(

    {
        name:'selectedThemeReducer',
        initialState: "Light",
        reducers:{
            setSelectedTheme: (state,action) =>{
                state = action.payload
                return state
            },
           
        }
    }
)

export const {setSelectedTheme}   = selectedThemeSlice.actions
export const selectedThemeReducer = selectedThemeSlice.reducer