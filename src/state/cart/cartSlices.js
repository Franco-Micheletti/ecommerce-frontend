import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../components/cart/functions/getCartFromLocalStorage";
import { countTotalInLocalStorage } from "../../components/cart/functions/countTotalInLocalStorage"
import { getObjectFromLocalStorage } from "../../components/cart/functions/expandAddButtonListLocalStorage";
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
                console.log("removing one product")
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
                const productId = action.payload
                state.forEach(  (product,index) => {
                    if (product["id"] === productId) {
                        state.splice(index,1)
                    }
                });
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
                const productId = action.payload
                state.forEach(  (product,index) => {
                    if (product["id"] === productId) {
                        state[index]["quantity"] -= 1
                    }
                });
                return state
            }
        }
    }
)

export const expandAddButtonSlice = createSlice(
    {   
        name:'expandButtonListReducer',
        initialState: getObjectFromLocalStorage(),
        reducers:{
            addToExpandAddButtonList: (state,action) => {
                const id = action.payload
                state[id] = {"quantity":1}
                
                return state
            },
            removeFromExpandAddButtonList: (state,action) => {
                
                const id = action.payload
                
                delete state[id]
                
                return state
            },
            quantityDecrease: (state,action) => {
                
                const id = action.payload
                
                state[id]["quantity"] -= 1

                return state
            },
            quantityIncrease: (state,action) => {
                const id = action.payload
                
                state[id]["quantity"] += 1

                return state
            }
        }
    }
)


// Actions
export const {cartCounterIncrease,cartCounterDecrease,cartCounterReset} = cartCounterSlice.actions
export const {cartListAdd,cartListRemove,cartListReset,addOneMoreOfTheSameProduct,removeOneOfTheSameProduct} = cartListSlice.actions
export const {addToExpandAddButtonList,removeFromExpandAddButtonList,quantityDecrease,quantityIncrease} = expandAddButtonSlice.actions
// Reducers
export const cartCounterReducer     = cartCounterSlice.reducer
export const cartListReducer        = cartListSlice.reducer
export const expandAddButtonListReducer  = expandAddButtonSlice.reducer