import { store } from '../../../state/store'
import { cartCounterIncrease } from "../../../state/cart/cartSlices";
import { cartListAdd,addOneMoreOfTheSameProduct } from '../../../state/cart/cartSlices';
import { addProductToLocalStorage } from "../functions/addProductToLocalStorage";
import { checkIfProductExistInCart } from "./checkIfProductExistInCart"

export const addProductToCart = (product) => {
    
    // Self note - This generates a copy of the object , that is why i used parse followed by stringify
    const productNew = JSON.parse(JSON.stringify(product))
    // Check if product exist in the cart already ...
    const listProductsInCart = store.getState().cartListReducer
    const indexOfRepeatedProduct = checkIfProductExistInCart(listProductsInCart,productNew["id"])
    
    if (indexOfRepeatedProduct !== null)  {
        // Modify quantity if repeated
        console.log(productNew["product_name"],"is repeated modifying quantity")
        store.dispatch(addOneMoreOfTheSameProduct(indexOfRepeatedProduct))
    } else {
        // Add to list if not repeated
        console.log("The product does not exist , creating quantity key")
        productNew["quantity"] = 1
        store.dispatch(cartListAdd(productNew))
    }
    
    // Add to local storage
    addProductToLocalStorage(productNew)
    // Counter increase
    store.dispatch(cartCounterIncrease(1))
}