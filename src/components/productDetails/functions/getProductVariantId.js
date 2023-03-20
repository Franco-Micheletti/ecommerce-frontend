export const getProductVariantId = (productData,variantOptions) => {
    
    const options = Object.keys(variantOptions).length
    let count     = 0
    let variantId = ''
    // Get id of the variant that matches with the variant options values selected
    for(let varianInfoIndex = 0;varianInfoIndex<productData["variant_data"].length;varianInfoIndex++){
        count = 0
        Object.keys(variantOptions).forEach( property => {

            const variantValue = productData["variant_data"][varianInfoIndex]["values"][property].toString().toLowerCase() 
            const optionValue  = variantOptions[property].toString().toLowerCase()
            if ( variantValue === optionValue ) {
                count += 1
            }
        })
        
        if (count === options) {
            variantId = productData["variant_data"][varianInfoIndex]["id"]
            break
        }
    }
    return variantId
}

