import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../components/cart/functions/getCartFromLocalStorage";
import { countTotalInLocalStorage } from "../../components/cart/functions/countTotalInLocalStorage"

export const cartCounterSlice = createSlice(
    {
        name:'cartCounterReducer',
        initialState: countTotalInLocalStorage(),
        reducers:{
            cartCounterIncrease: (state,action) =>{
                state += action.payload
                return state
            },
            cartCounterDecrease: (state,action) =>{
                state -= action.payload
                return state
            },
            cartCounterReset: (state) =>{
                state = 0
                return state
            }
        }
    }
)

export const cartListSlice = createSlice(
    {   
        name:'cartListReducer',
        initialState: getCartFromLocalStorage(),
        reducers:{
            cartListAdd: (state,action) => {
                state.push(action.payload)
                return state
            },
            cartListRemove: (state,action) => {
                const productIndex = action.payload
                state.splice(productIndex,1)
                
                return state
            },
            cartListReset: (state) => {
                state = []
                return state
            },
            addOneMoreOfTheSameProduct: (state,action) => {
                const productIndex = action.payload
                state[productIndex]["quantity"] += 1
                return state
            },
            removeOneOfTheSameProduct: (state,action) => {
                const productIndex = action.payload
                state[productIndex]["quantity"] -= 1
                return state
            }
        }
    }
)


// Actions
export const {cartCounterIncrease,cartCounterDecrease,cartCounterReset} = cartCounterSlice.actions
export const {cartListAdd,cartListRemove,cartListReset,addOneMoreOfTheSameProduct,removeOneOfTheSameProduct} = cartListSlice.actions
// Reducers
export const cartCounterReducer = cartCounterSlice.reducer
export const cartListReducer = cartListSlice.reducer