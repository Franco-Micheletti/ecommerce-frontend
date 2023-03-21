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

export const registrationFormDataslice = createSlice(

    {
        name:'registrationFormDataReducer',
        initialState: { 'firstname':"",
                        'lastname':"",
                        'username':"",
                        'password':"",
                        'birthday':"",
                        'phone':"",
                        'email':""},

        reducers:{
            setRegistrationFormData: (state,action) =>{
                const field = action.payload
                state[field.name] = field.value
                return state
            },
        }
    }
)

export const formErrorsslice = createSlice(

    {
        name:'formErrorssliceReducer',
        initialState: [],
        reducers:{
            addformError: (state,action) =>{
                action.payload.split(",").forEach(element => {
                    state.push(element)
                });
                return state
            },
            resetFormErrors: (state,action) =>{
                state = []
                return state
            },
        }
    }
)

export const userDataSlice = createSlice(

    {
        name:'userDataReducer',
        initialState: {},
        reducers:{
            setUserData: (state,action) =>{
                state = action.payload
                return state
            }
        }
    }
)

export const {setJwtAccess,setJwtRefresh,deleteUserCredentials}   = userCredentialsSlice.actions
export const {setRenderUserOptions} = renderUserOptionsSlice.actions
export const {setRegistrationFormData} = registrationFormDataslice.actions
export const {addformError,resetFormErrors} = formErrorsslice.actions
export const {setUserData} = userDataSlice.actions

export const userCredentialsReducer = userCredentialsSlice.reducer
export const renderUserOptionsReducer = renderUserOptionsSlice.reducer
export const registrationFormDataReducer = registrationFormDataslice.reducer
export const formErrorsReducer = formErrorsslice.reducer
export const userDataReducer = userDataSlice.reducer