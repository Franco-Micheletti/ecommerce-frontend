
import {configureStore} from '@reduxjs/toolkit'
// Cart 
import {cartCounterReducer,cartListReducer} from './cart/cartSlices'
// Products
import {searchMadeReducer,
        stringInputReducer,
        productsReducer,
        filtersReducer,
        homeProductsReducer,
        appliedFiltersReducer,
        urlFiltersStringReducer} from './products/productsSlices'


export const store = configureStore({
    reducer: {
        // Cart
        cartCounterReducer,
        cartListReducer,
        // Products
        searchMadeReducer,
        stringInputReducer,
        productsReducer,
        filtersReducer,
        homeProductsReducer,
        appliedFiltersReducer,
        urlFiltersStringReducer
        
    }
})



