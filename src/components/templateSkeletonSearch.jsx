import React from "react"
// CSS IMPORTS
import '../css/products.css'
import '../css/search.css'
import '../css/filters.css'
import '../css/skeleton.css'

export const TemplateSkeletonSearch = () => {

    const screenWidth = window.innerWidth > 0 ? window.innerWidth : Screen.width;
    if (screenWidth <= 425 ) {
        var arr = [0,1,2,4]
    } else if (screenWidth > 425 && screenWidth <= 1024) {
        var arr = [0,1,2]
    }
    else if (screenWidth > 1024){
        var arr = [0,1,2]
    }
    return (
        <div className="body-container-search">
            {
                screenWidth > 769
                ?   <div className="skeleton-item skeleton-filters-search">
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                        <div className="skeleton-item skeleton-text-search"></div>
                    </div>
                
                :  <></>
            }
            
            <div className="results">
                <div className="results-container">
                    <span className="title-results skeleton-item skeleton-text-search"></span>
                    <div className="products-list-container">
                        {
                            [0,1,2,3,4,5].map( (num) => {   
                                return (
                                    <div>
                                        
                                            {   
                                                arr.map( (num) => {   
                                                    
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