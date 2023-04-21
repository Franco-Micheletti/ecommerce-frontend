import React from "react"
import { useSelector } from "react-redux"

// CSS IMPORTS
import '../css/products.css'
import '../css/search.css'
import '../css/filters.css'
import '../css/skeleton.css'

export const TemplateSkeletonSearch = () => {

    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    const showMobileFilterContainer = useSelector((store) => store.showMobileFilterContainerReducer)

    return (
        <div className="body-search">
            <div>
                <div className="body-container-search">
                    {
                        screenWidth > 1240
                            ?   <div className="skeleton-item filters-container"></div>
                            :   <></>
                    }
                    <div className="results">
                        <div className="results-container">
                            <div className="skeleton-text-search"></div>
                            <div className="products-list-container">
                                {
                                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( (num,index)=> {
                                        return (
                                            <div key={index} className="skeleton-item skeleton-product-item"></div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}