import React from "react"
// CSS IMPORTS
import '../css/products.css'
import '../css/filters.css'
import '../css/home.css'
import '../css/skeleton.css'

export const TemplateSkeletonHome = () => {

    return (
        <div className="body-home">
            <div className="results">
                <div className="results-container">
                    <span className="title-results skeleton-item skeleton-text-search"></span>
                    <div className="products-list-container">
                        {
                            [0,1,2,3,4,5].map( (num) => {   
                                return (
                                    <div>
                                        {   
                                            [0,1,2,3,4,5].map( (num) => {   
                                                
                                                return(
                                                    <div className="product-item">
                                                        
                                                        <div className="skeleton-item skeleton-image-search"></div>
                                                        <div className="skeleton-item skeleton-text-search"></div>
                                                        <div className="skeleton-item skeleton-text-search"></div>
                                                        <div className="skeleton-item skeleton-text-search"></div>
                                                        <div className="skeleton-item skeleton-text-search"></div>
                                                        <div className="skeleton-item skeleton-text-search"></div>
                                                    </div>
                                                ) 
                                            })
                                        }
                                    </div>
                                    
                                )
                                
                            })
                        }
                    </div>
                </div>
            </div>
        </div>  
    )

}