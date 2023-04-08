/**
 * 
 * Returns the index of the repeated product
 * 
 * If there is no repeated product returns null.
 * 
 * Params:
 * 
 * ```list```( Array )
 * 
 * ```productId```( UUID )
 * 
*/
export const checkIfProductExistInCart = (list,productId) => {

    let indexOfRepeatedProduct = null
    list.forEach( (product,index) => {
        if (product["id"] === productId) {
            indexOfRepeatedProduct = index
        }
    })

    return indexOfRepeatedProduct
}