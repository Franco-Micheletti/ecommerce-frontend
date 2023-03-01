/**
 * Handle the onClick event for scrolling left or right the products at the home page
 * Recibes 3 parameters
 * 
 * ```side``` : String | This indicates wheter is a left button or a right button
 * 
 * ```number``` : Integer | If there is more than one left button or right button this indicates which button is.
 * 
 * ```elementToMove``` : String | It's the HTML element that should be scrolled
 *              
 */
export function handleHorizontalScrolling(side,number,elementToMove) {
    
    if ( typeof number === "number" && 
         typeof elementToMove === "string" &&
         typeof side === "string" ) {

            if (side === "left") {
                // Scroll to the left
                const container = document.getElementById(elementToMove)
                // Scroll based on media width
                const width = container.offsetWidth
                if (width === 236) {
                    container.scrollLeft -= width +13
                    console.log(container.scrollLeft)
                    if(container.scrollLeft < 275) {
                        // Hide left button
                        const leftButton = document.getElementById("scroll-left-"+number.toString(10))
                        leftButton.style.visibility = "hidden"
                        // Show right button
                        const rightButton = document.getElementById("scroll-right-"+number.toString(10))
                        rightButton.style.visibility = "visible"
                    }
                } else {
                    // Hide left button
                    const leftButton = document.getElementById("scroll-left-"+number.toString(10))
                    leftButton.style.visibility = "hidden"
                    // Show right button
                    const rightButton = document.getElementById("scroll-right-"+number.toString(10))
                    rightButton.style.visibility = "visible"
                    container.scrollLeft -= 1149
                }
                
            }   
            else if (side === "right") {
    
                
                // Scroll to the left
                const container = document.getElementById(elementToMove)
                // Scroll based on media width
                const width = container.offsetWidth
                if (width === 236) {
                    container.scrollLeft += width +13
                    console.log(container.scrollLeft)
                    if(container.scrollLeft > 450) {
                        // Hide right button
                        const rightButton = document.getElementById("scroll-right-"+number.toString(10))
                        rightButton.style.visibility = "hidden"
                        // Show left button
                        const leftButton = document.getElementById("scroll-left-"+number.toString(10))
                        leftButton.style.visibility = "visible"
                    }
                } else {
                    // Hide left button
                    const rightButton = document.getElementById("scroll-right-"+number.toString(10))
                    rightButton.style.visibility = "hidden"
                    // Show right button
                    const leftButton = document.getElementById("scroll-left-"+number.toString(10))
                    leftButton.style.visibility = "visible"
                    container.scrollLeft += 1149
                }
            }

        }
}    

