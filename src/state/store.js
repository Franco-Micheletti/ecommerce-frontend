
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
        urlFiltersStringReducer,
        dataLoadingReducer} from './products/productsSlices'

import { 
         maxPriceFilterReducer,
         minPriceValueReducer,
         maxPriceValueReducer } from './filters/filtersSlices'

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
        urlFiltersStringReducer,
        maxPriceFilterReducer,
        minPriceValueReducer,
        maxPriceValueReducer,
        dataLoadingReducer
    }
})



