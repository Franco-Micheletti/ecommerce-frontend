
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
         maxPriceValueReducer,
         orderByListReducer } from './filters/filtersSlices'
// Pagination
import {
        pagesListReducer,
        pageReducer} from './pagination/paginationSlices'
// Specific Product
import { specificProductReducer,
        reviewFormDataReducer,
        bigImageReducer,
        mouseOverImagesReducer } from './specificProduct/productsSlices'
// Reviews
import { reviewSubmittedReducer,
         reviewErrorReducer,
         updateReviewReducer } from './reviews/reviewsSlices'
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
        dataLoadingReducer,
        popularProductsForCartReducer,
        totalResultsReducer,
        // Filters
        maxPriceFilterReducer,
        minPriceValueReducer,
        maxPriceValueReducer,
        orderByListReducer,
        // Pagination
        pagesListReducer,
        pageReducer,
        // Specific Product
        specificProductReducer,
        reviewFormDataReducer,
        bigImageReducer,
        mouseOverImagesReducer,
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
        reviewSubmittedReducer,
        reviewErrorReducer,
        updateReviewReducer

    }
})



