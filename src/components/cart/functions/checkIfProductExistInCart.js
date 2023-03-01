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
 * ```nameOfProduct```( String )
 * 
*/
export const checkIfProductExistInCart = (list,nameOfProduct) => {

    let indexOfRepeatedProduct = null
    list.forEach( (product,index) => {
        if (product["product_name"] === nameOfProduct) {
            indexOfRepeatedProduct = index
        }
    })

    return indexOfRepeatedProduct
}