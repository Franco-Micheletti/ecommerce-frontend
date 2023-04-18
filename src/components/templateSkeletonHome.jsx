import React from "react"
// CSS IMPORTS
import '../css/products.css'
import '../css/filters.css'
import '../css/home.css'
import '../css/skeleton.css'

export const TemplateSkeletonHome = () => {

    return (
        <div className="body-home">
            <div>
                <div className="skeleton-item skeleton-carousel-image"></div>
            </div>
            <div className="home-first">
                <div className="skeleton-item skeleton-card-image"></div>
                <div className="home-navigate-product-types">
                    {
                        [0,1,2,3,4,5].map( () => {
                            return (
                                <div className="navigate-product-type-home">
                                    <div className="skeleton-item home-product-types-image"></div>
                                    <label className="skeleton-text-home"></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="home-first">
                <div className="skeleton-item skeleton-card-image"></div>
                <div className="home-navigate-product-types">
                    {
                        [0,1,2,3,4,5].map( () => {
                            return (
                                <div className="navigate-product-type-home">
                                    <div className="skeleton-item home-product-types-image"></div>
                                    <label className="skeleton-text-home"></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="home-first">
                <div className="skeleton-item skeleton-card-image"></div>
                <div className="home-navigate-product-types">
                    {
                        [0,1,2,3,4,5].map( () => {
                            return (
                                <div className="navigate-product-type-home">
                                    <div className="skeleton-item home-product-types-image"></div>
                                    <label className="skeleton-text-home"></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>  
    )

}