import React from "react"

export const ProductSpecifications = ({productData}) => {

    return (
        <div>
            <div className="product-all-info-title">Specifications</div>
            {
                Object.keys(productData["properties"]).map( (nameParameter) => {
                    
                    const name = nameParameter.charAt(0).toUpperCase() + nameParameter.slice(1).replaceAll("_"," ")
                    const value = productData["properties"][nameParameter]
                    return (
                    <div className="product-property-item">
                        <div className="product-property-name">{name}</div>
                        <div className="product-property-value">{value}</div>
                    </div>
                    )
                })
            }
        </div>
    )
}