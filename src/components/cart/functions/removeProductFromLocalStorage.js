export const removeProductFromLocalStorage = (productId=null) => {
        
        if ( productId !== null ) {
            
            // Get the list from local storage
            let productsList = JSON.parse( window.localStorage.getItem("cart_products") )
            
            // Modify the quantity of the product if the product quantity is higher than 1
            productsList.forEach( (product,index) => {
                if ( product["id"] === productId ) {
                    
                    if ( productsList[index]["quantity"] > 1 ) {
                        console.log("quantity is higher than 1 , removing one quantity")
                        productsList[index]["quantity"] -= 1
                    } 
                        // Remove the product from the list if quantity is equal to 1.
                    else {
                        console.log("quantity is 1 , removing product")
                        productsList.splice(index,1)
                    }
                    // Update the list
                    window.localStorage.setItem("cart_products",JSON.stringify(productsList))
                }
            });
            
        }  
            // If key doesn't exist in local storage we create it and then we add the product
        else {
            console.log("Local Storage Function: Product parameter was not provided")
        }
          
}