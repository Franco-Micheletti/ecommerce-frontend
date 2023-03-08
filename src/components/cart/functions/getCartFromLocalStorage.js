
export const getCartFromLocalStorage = () => {
    
    const productsList = window.localStorage.getItem("cart_products")
    if (productsList !== null) {
        return JSON.parse(productsList)
    } else {
        return []
    }

}

