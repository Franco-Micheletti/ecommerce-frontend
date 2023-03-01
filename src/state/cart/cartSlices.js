import { createSlice } from "@reduxjs/toolkit";
import { cartProductsLocalStorage } from "../../components/cart/functions/cartProductsLocalStorage";
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
        initialState:cartProductsLocalStorage("cart_products")
        ,
        reducers:{
            cartListAdd: (state,action) => {
                state.push(action.payload)
                return state
            },
            cartListRemove: (state,action) => {
                state.filter(product => product["product_name"] === action.payload["product_name"] )
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
            }
        }
    }
)


// Actions
export const {cartCounterIncrease,cartCounterDecrease,cartCounterReset} = cartCounterSlice.actions
export const {cartListAdd,cartListRemove,cartListReset,addOneMoreOfTheSameProduct} = cartListSlice.actions
// Reducers
export const cartCounterReducer = cartCounterSlice.reducer
export const cartListReducer = cartListSlice.reducer