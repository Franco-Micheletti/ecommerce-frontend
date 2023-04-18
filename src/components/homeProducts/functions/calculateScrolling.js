export const calculateScrolling = (screenWidth) => {

    if (screenWidth >= 280 && screenWidth <= 608) {
        return 230
    } else if (screenWidth >= 609 && screenWidth < 850 ) {
        return 230 * 2
    } else if (screenWidth >= 850 && screenWidth < 1200 ) {
        return 230 * 3
    } else if (screenWidth >= 1200 ) {
        return 230 * 4
    }

}