import { store } from '../../../state/store'
import { cartCounterDecrease} from "../../../state/cart/cartSlices";
import { cartListRemove,removeOneOfTheSameProduct } from '../../../state/cart/cartSlices';
import { removeProductFromLocalStorage } from './removeProductFromLocalStorage';
import { checkIfProductExistInCart } from "./checkIfProductExistInCart"

export const removeProductFromCart = (product) => {
    
    // Self note - This generates a copy of the object , that is why i used parse followed by stringify
    const productToRemove = JSON.parse(JSON.stringify(product))
    // Check if product exist in the cart already ...
    const listProductsInCart = store.getState().cartListReducer
    const indexOfRepeatedProduct = checkIfProductExistInCart(listProductsInCart,productToRemove["id"])

    if (indexOfRepeatedProduct !== null)  {
        // Modify quantity if repeated
        console.log(productToRemove["product_name"],"is repeated , removing one quantity")
        store.dispatch(removeOneOfTheSameProduct(indexOfRepeatedProduct))
    } else {
        // Add to list if not repeated
        store.dispatch(cartListRemove(indexOfRepeatedProduct))
    }
    
    // Add to local storage
    removeProductFromLocalStorage(indexOfRepeatedProduct)
    // Counter increase
    store.dispatch(cartCounterDecrease(1))
}