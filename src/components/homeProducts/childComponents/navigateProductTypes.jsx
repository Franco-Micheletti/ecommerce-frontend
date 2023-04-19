import React from "react";
import { useDispatch } from "react-redux";
import { resetAppliedFiltersList } from "../../../state/products/productsSlices";
import { createSearchParams,useNavigate } from "react-router-dom";

export const NavigateProductTypes = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToProductType = (q) => {
        dispatch(resetAppliedFiltersList())
        const params = { q: q, page: '1' };
        navigate({
        pathname: '/search/',
        search: `?${createSearchParams(params)}`,
        });
    }

    return (

        <div className="home-navigate-product-types">
            <div onClick={()=> goToProductType("table")} className="navigate-product-type-home">
                <img alt="navigate-tables" className="home-product-types-image" width={"300"} height={"300"} src={require(`../../../images/coffe-tables.webp`)}></img>
                <label>Coffe Tables</label>
            </div>
            <div onClick={()=> goToProductType("laptop")} className="navigate-product-type-home">
            <img alt="navigate-laptops" className="home-product-types-image" width={"300"} height={"300"} src={require(`../../../images/laptops.webp`)}></img>
                <label>Laptops</label>
            </div>
            <div onClick={()=> goToProductType("energy drink")} className="navigate-product-type-home">
                <img alt="navigate-energy-drinks"className="home-product-types-image" width={"300"} height={"300"} src={require(`../../../images/energy-drinks.webp`)}></img>
                <label>Energy Drinks</label>
            </div>
            <div onClick={()=> goToProductType("soda pop")} className="navigate-product-type-home">
                <img alt="navigate-sodas"className="home-product-types-image" width={"300"} height={"300"} src={require(`../../../images/sodas.webp`)}></img>
                <label>Soda Pop</label>
            </div>
            <div onClick={()=> goToProductType("cookies")} className="navigate-product-type-home">
                <img alt="navigate-cookies"className="home-product-types-image" width={"300"} height={"300"} src={require(`../../../images/cookies.webp`)}></img>
                <label>Cookies</label>
            </div>
            <div style={{justifyContent:"center"}} className="navigate-product-type-home">
                <label>More</label>
            </div>
        </div>
    )
}