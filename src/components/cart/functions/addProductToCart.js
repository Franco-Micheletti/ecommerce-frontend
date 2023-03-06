import { store } from '../../../state/store'
import { cartCounterIncrease } from "../../../state/cart/cartSlices";
import { cartListAdd,addOneMoreOfTheSameProduct } from '../../../state/cart/cartSlices';
import { cartProductsLocalStorage } from "../functions/cartProductsLocalStorage";
import { checkIfProductExistInCart } from "./checkIfProductExistInCart"

export const addProductToCart = (product) => {
    
    // Self note - This generates a copy of the object , that is why i used parse followed by stringify
    const productNew = JSON.parse(JSON.stringify(product))
    // Check if product exist in the cart already ...
    const listProductsInCart = store.getState().cartListReducer
    const indexOfRepeatedProduct = checkIfProductExistInCart(listProductsInCart,productNew["product_name"])

    if (indexOfRepeatedProduct !== null)  {
        // Modify quantity if repeated
        console.log(productNew["product_name"],"is repeated modifying quantity")
        store.dispatch(addOneMoreOfTheSameProduct(indexOfRepeatedProduct))
    } else {
        // Add to list if not repeated
        
        productNew["quantity"] = 1
        store.dispatch(cartListAdd(productNew))
    }
    
    // Add to local storage
    cartProductsLocalStorage("cart_products",productNew,false)
    // Counter increase
    store.dispatch(cartCounterIncrease(1))
}