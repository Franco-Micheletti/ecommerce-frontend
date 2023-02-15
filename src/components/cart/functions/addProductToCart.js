import {store} from '../../../state/store'
import { cartCounterIncrease } from "../../../state/cart/cartSlices";
import { cartListAdd } from '../../../state/cart/cartSlices';
import { cartProductsLocalStorage } from "../functions/cartProductsLocalStorage";

export const addProductToCart = (product) => {
        
    // Product
    const productNew = JSON.parse(JSON.stringify(product))
    delete productNew["id"]
    productNew["quantity"] = 1
    // Counter
    store.dispatch(cartCounterIncrease(1))
    // List
    store.dispatch(cartListAdd(productNew))
    // Local Storage
    cartProductsLocalStorage("cart_products",productNew)
}