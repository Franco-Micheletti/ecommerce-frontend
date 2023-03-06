import React from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer";
import { useParams } from "react-router-dom";

export const productDetails = () => {

    const {params} = useParams()

    return (

        <div>
            <img className="cart-product-image-big" src={require(`../../images/${imageFile}.webp`)}></img>
        </div>
    )
}