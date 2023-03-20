
import {configureStore} from '@reduxjs/toolkit'
// Cart 
import {cartCounterReducer,
        cartListReducer,
        expandAddButtonListReducer} from './cart/cartSlices'
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
        popularProductsForCartReducer,
        totalResultsReducer } from './products/productsSlices'
// Filters
import { 
         maxPriceFilterReducer,
         minPriceValueReducer,
         maxPriceValueReducer } from './filters/filtersSlices'
// Pagination
import {
        pagesListReducer,
        pageReducer} from './pagination/paginationSlices'
// Specific Product
import { specificProductReducer } from './specificProduct/productsSlices'
// Variants
import { variantOptionsReducer,variantValuePreviewReducer } from './variants/variantsSlices' 
// Favorites
import { favoritesListReducer } from './favorites/favoritesSlices'
// User
import { userCredentialsReducer,renderUserOptionsReducer} from './user/userSlices'


export const store = configureStore({
    reducer: {
        // Cart
        cartCounterReducer,
        cartListReducer,
        expandAddButtonListReducer,
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
        totalResultsReducer,
        // Pagination
        pagesListReducer,
        pageReducer,
        // Product
        specificProductReducer,
        // Variants
        variantOptionsReducer,
        variantValuePreviewReducer,
        // Favorites
        favoritesListReducer,
        // User
        userCredentialsReducer,
        renderUserOptionsReducer

    }
})



