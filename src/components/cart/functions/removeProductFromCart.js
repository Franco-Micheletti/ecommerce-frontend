import { store } from '../../../state/store'
import { cartCounterDecrease, quantityDecrease} from "../../../state/cart/cartSlices";
import { cartListRemove,removeOneOfTheSameProduct,removeFromExpandAddButtonList } from '../../../state/cart/cartSlices';
import { removeProductFromLocalStorage } from './removeProductFromLocalStorage';
import { removeFromExpandObjectLocalStorage } from './expandAddButtonListLocalStorage';

export const removeProductFromCart = (productId) => {

    const expandAddButtonList = store.getState().expandAddButtonListReducer
    const quantityOfProduct   = expandAddButtonList[productId]["quantity"]
    
    if( quantityOfProduct > 1 ) {
        console.log("removing one quantity")
        store.dispatch(removeOneOfTheSameProduct(productId))
        // Remove from expandAddbutton list
        store.dispatch(quantityDecrease(productId))
    } else {
        console.log("product removed")
        store.dispatch(cartListRemove(productId))
        // Remove from expandAddbutton list
        store.dispatch(removeFromExpandAddButtonList(productId))
    }

    // Remove from local storage
    removeProductFromLocalStorage(productId)
    // Remove from expand list local storage
    removeFromExpandObjectLocalStorage(productId)
    // Counter decrease
    store.dispatch(cartCounterDecrease(1))
}