
import {configureStore} from '@reduxjs/toolkit'
// Cart 
import {cartCounterReducer,cartListReducer} from './cart/cartSlices'
// Products
import {
        searchMadeReducer,
        stringInputReducer,
        productsReducer,
        filtersReducer,
        homeProductsReducer,
        appliedFiltersReducer,
        urlFiltersStringReducer,
        dataLoadingReducer,
        popularProductsForCartReducer} from './products/productsSlices'
// Filters
import { 
         maxPriceFilterReducer,
         minPriceValueReducer,
         maxPriceValueReducer } from './filters/filtersSlices'
// Pagination
import {
        pagesListReducer,
        pageReducer} from './pagination/paginationSlices'

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
        dataLoadingReducer,
        popularProductsForCartReducer,
        // Pagination
        pagesListReducer,
        pageReducer

    }
})



