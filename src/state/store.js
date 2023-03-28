
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
import { specificProductReducer,userReviewReducer } from './specificProduct/productsSlices'
// Reviews
import { reviewSubmittedReducer } from './reviews/reviewsSlices'
// Variants
import { variantOptionsReducer,variantValuePreviewReducer } from './variants/variantsSlices' 
// Favorites
import { favoritesListReducer,favoritesIconChangeListReducer,showFavoritesPreviewReducer } from './favorites/favoritesSlices'
// User
import { userCredentialsReducer,
        renderUserOptionsReducer,
        registrationFormDataReducer,
        formErrorsReducer,
        userDataReducer} from './user/userSlices'


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
        userReviewReducer,
        // Variants
        variantOptionsReducer,
        variantValuePreviewReducer,
        // Favorites
        favoritesListReducer,
        favoritesIconChangeListReducer,
        showFavoritesPreviewReducer,
        // User
        userCredentialsReducer,
        renderUserOptionsReducer,
        registrationFormDataReducer,
        formErrorsReducer,
        userDataReducer,
        // Reviews
        reviewSubmittedReducer

    }
})



