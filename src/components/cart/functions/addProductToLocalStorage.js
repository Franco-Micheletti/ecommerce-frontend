import { checkIfProductExistInCart } from "./checkIfProductExistInCart"

export const addProductToLocalStorage = (product) => {
        
        // Add a new product to the cart
        if ( typeof product === "object" && Array.isArray(product) === false ) {
            if (window.localStorage.getItem("cart_products")) {
                
                // Get the list from local storage
                let productsList = JSON.parse( window.localStorage.getItem("cart_products") )
                // Get product ID
                let productId = product["id"]
                // Check if the product exist in the cart
                const indexExistingProduct = checkIfProductExistInCart(productsList,productId)
                // Modify the quantity of the product if the product already exists
                if (indexExistingProduct === null) {
                    productsList.push(product)
                } else {
                    productsList[indexExistingProduct]["quantity"] += 1
                }
                // Update list
                window.localStorage.setItem("cart_products",JSON.stringify(productsList))
            } // If key doesn't exist in local storage we create it and then we add the product
            else {
                const productsList = []
                productsList.push(product)
                window.localStorage.setItem("cart_products",JSON.stringify(productsList))
            }  
        }
        else {
            console.log("Local Storage Function: Key was not provided or product parameter is not an object.")
        }
          
}