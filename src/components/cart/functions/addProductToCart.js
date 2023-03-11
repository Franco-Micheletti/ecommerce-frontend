import { store } from '../../../state/store'
import { cartCounterIncrease, 
         quantityIncrease,
         cartListAdd,
         addOneMoreOfTheSameProduct } from "../../../state/cart/cartSlices";
import {  } from '../../../state/cart/cartSlices';
import { addProductToLocalStorage } from "../functions/addProductToLocalStorage";
import { checkIfProductExistInCart } from "./checkIfProductExistInCart"
import { addToExpandAddButtonList, } from '../../../state/cart/cartSlices';
import { addToExpandObjectLocalStorage } from './expandAddButtonListLocalStorage';

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
        // Increase quantity in expandAddButton list
        store.dispatch(quantityIncrease( productNew["id"] ))
    } else {
        // Add to list if not repeated
        console.log("The product does not exist! , adding to list ...")
        store.dispatch(cartListAdd(productNew))
        // Add expandAddButton list
        store.dispatch(addToExpandAddButtonList(productNew["id"] ))
        

    }
    
    // Add to local storage
    addProductToLocalStorage(productNew)
    // Add to expand list local storage
    addToExpandObjectLocalStorage(productNew["id"])
    // Counter increase
    store.dispatch(cartCounterIncrease(1))
}