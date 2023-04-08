import { setDataLoading, setHomeProducts } from "../state/products/productsSlices"
import { store } from "../state/store";

export const fetchHomeProducts = () => {

    console.log(process.env.REACT_APP_PRODUCTION)
    if (process.env.PRODUCTION === true){
        var url = 'https://ecommerce-backend-production-5b7a.up.railway.app'
    } else {
        var url = 'http://127.0.0.1:8000'
    }

    fetch(`${url}/products/home`)
    .then(response => {
                    if (response.status === 200 ) {
                        return response.json()
                    } 
                    }
    )
    .then(data => {
        store.dispatch(setHomeProducts(data))
        store.dispatch(setDataLoading(true))    
        }
    )
} 
