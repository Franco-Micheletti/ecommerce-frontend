export const countTotalInLocalStorage = () => {

    const listOfProducts = JSON.parse(window.localStorage.getItem("cart_products"))
    
    if (listOfProducts !== null) {
        let total = 0
        listOfProducts.map( product=> {
            if (product["quantity"] > 1) {
                total += product["quantity"]
            } else {
                total += 1
            }
        })
        return total
    } else {
        return 0
    }

    
}