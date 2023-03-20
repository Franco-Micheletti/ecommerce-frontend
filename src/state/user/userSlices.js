import { createSlice  } from "@reduxjs/toolkit";


export const userCredentialsSlice = createSlice(

    {
        name:'userCredentialsReducer',
        initialState: {},
        reducers:{
            setJwtAccess: (state,action) =>{
                state["jwt_access"] = action.payload
                return state
            },
            setJwtRefresh: (state,action) =>{
                state["jwt_refresh"] = action.payload
                return state
            },
            deleteUserCredentials: (state,action) =>{
                state = {}
                return state
            },
        }
    }
)

export const renderUserOptionsSlice = createSlice(

    {
        name:'userCredentialsReducer',
        initialState: false,
        reducers:{
            setRenderUserOptions: (state,action) =>{
                state = action.payload
                return state
            },
           
        }
    }
)


export const {setJwtAccess,setJwtRefresh,deleteUserCredentials}   = userCredentialsSlice.actions
export const {setRenderUserOptions} = renderUserOptionsSlice.actions

export const userCredentialsReducer = userCredentialsSlice.reducer
export const renderUserOptionsReducer = renderUserOptionsSlice.reducer