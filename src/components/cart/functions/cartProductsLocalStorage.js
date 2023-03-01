
/**
 * Saves or gets a list to/from local storage using the provided key
 * Returns an empty array if there is no products in the local storage
 * 
 * 
 * ```key``` :  "" | String - The key that corresponds to the cart list.
 * 
 * ```product``` : {} | Object - The object to be added to the list
 * 
 * 
 * 
 */
import {checkIfProductExistInCart} from './checkIfProductExistInCart'

export const cartProductsLocalStorage = (key,product=null) => {

        // Get list of products in the cart
        if ( key && !product ){
            
            const productsList = window.localStorage.getItem(key)
            if (productsList !== null) {
                return JSON.parse(productsList)
            } else {
                return []
            }
            
            // Add a new product to the cart
        } else if ( key && typeof product === "object" && Array.isArray(product) === false ) {
            
            if (window.localStorage.getItem(key)) {
                
                // Get the list from local storage
                let productsList = JSON.parse( window.localStorage.getItem(key) )
                // Get name of product
                let nameOfProduct = product["product_name"]
                // Check if the product exist in the cart
                const indexOfRepeatedProduct = checkIfProductExistInCart(productsList,nameOfProduct)
                // Modify the quantity of the product if the product already exists
                // Add the product to the list if it does not exist.
                indexOfRepeatedProduct === null
                    ? productsList.push(product)
                    : productsList[indexOfRepeatedProduct]["quantity"] += 1
                // Update the list
                window.localStorage.setItem(key,JSON.stringify(productsList))
            } 
                // If key doesn't exist in local storage we create it and then we add the product
            else {
                const productsList = []
                productsList.push(product)
                window.localStorage.setItem(key,JSON.stringify(productsList))
            }  
        }
        else {
            console.log("Local Storage Function: Key was not provided or product parameter is not an object.")
        }
          
}

