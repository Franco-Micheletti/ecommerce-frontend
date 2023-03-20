import { createSlice  } from "@reduxjs/toolkit";

export const variantOptionsSlice = createSlice(

    {
        name:'variantOptionsReducer',
        initialState: {},
        reducers:{
            setVariantOption: (state,action) =>{
                const product = action.payload
                const options_properties = Object.keys(product["variant_options"])
                options_properties.forEach(property => {
                    state[property] = product["properties"][property]
                });
                return state
            },
            updateVariantOption: (state,action) =>{

                const property = action.payload["property"]
                const value    = action.payload["value"]
                
                state[property] = value

                return state
                
            }

        }
    }
)

export const variantValuePreviewSlice = createSlice(

    {
        name:'variantValuePrevie',
        initialState: {},
        reducers:{
            setVariantValuePreview: (state,action) =>{

                const property = action.payload["property"]
                const value    = action.payload["value"]
                
                state[property] = value
                
                return state
            }
        }
    }
)

// Export actions
export const {setVariantOption}         = variantOptionsSlice.actions
export const {updateVariantOption}      = variantOptionsSlice.actions
export const {setVariantValuePreview} = variantValuePreviewSlice.actions
// Export reducers
export const variantOptionsReducer = variantOptionsSlice.reducer
export const variantValuePreviewReducer = variantValuePreviewSlice.reducer