import { createSlice,current } from "@reduxjs/toolkit";

export const maxPriceFilterSlice = createSlice(

    {
        name:'maxPriceFilterReducer',
        initialState: 0,
        reducers:{
            setMaxPrice: (state,action) =>{
                state = action.payload
                return state
            }

        }
    }
)

export const minPriceValueSlice = createSlice(

    {
        name:'minPriceValueReducer',
        initialState: 0,
        reducers:{
            setMinPriceValue: (state,action) =>{
                state = action.payload
                return state
            }

        }
    }
)

export const maxPriceValueSlice = createSlice(

    {
        name:'maxPriceValueReducer',
        initialState: 0,
        reducers:{
            setMaxPriceValue: (state,action) =>{
                state = action.payload
                return state
            }

        }
    }
)

export const orderByListSlice = createSlice(

    {
        name:'orderByListReducer',
        initialState: [],
        reducers:{
            addOrderByToList: (state,action) => {
                
                const string = action.payload
                state.push(string)
                return state
            },
            removeOrderByFromList: (state,action) => {
                
                const string = action.payload
                state.splice(state.indexOf(string),1)
                return state
            }
            
        }
    }
)


// Export actions
export const {setMaxPrice} = maxPriceFilterSlice.actions
export const {setMinPriceValue} = minPriceValueSlice.actions
export const {setMaxPriceValue} = maxPriceValueSlice.actions
export const {addOrderByToList,removeOrderByFromList} = orderByListSlice.actions

// Export reducers
export const maxPriceFilterReducer = maxPriceFilterSlice.reducer
export const minPriceValueReducer  = minPriceValueSlice.reducer
export const maxPriceValueReducer  = maxPriceValueSlice.reducer
export const orderByListReducer    = orderByListSlice.reducer