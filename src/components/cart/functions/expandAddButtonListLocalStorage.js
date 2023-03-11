
export const addToExpandObjectLocalStorage = (productId) =>{
    if (productId) {
        if (window.localStorage.getItem("expand_object")) {

            let expand_object = JSON.parse( window.localStorage.getItem("expand_object") )

            if ( expand_object.hasOwnProperty(productId) === true ) {
                expand_object[productId]["quantity"] += 1 
            } else {
                expand_object[productId] = {"quantity":1}
            }
            // Update object
            window.localStorage.setItem("expand_object",JSON.stringify(expand_object))

        } else {
            const object = {}
            object[productId] = {"quantity":1}
            const objectToString = JSON.stringify( object )
            window.localStorage.setItem("expand_object",objectToString)
        }
    } else {
        console.log("EXPAND ADD BUTTON OBJECT - ProductId not provided")
    }
}

export const removeFromExpandObjectLocalStorage = (productId) => {

    let expand_object = JSON.parse( window.localStorage.getItem("expand_object") )

    if ( expand_object[productId]["quantity"] > 1) {
        expand_object[productId]["quantity"] -= 1
    } else {
        delete expand_object[productId]
    }

    // Update object
    window.localStorage.setItem("expand_object",JSON.stringify(expand_object))
}

export const getObjectFromLocalStorage = () => {

    if (window.localStorage.getItem("expand_object")) {
        let expand_object = JSON.parse( window.localStorage.getItem("expand_object") )
        return expand_object
    } else {
        return {}
    }
}