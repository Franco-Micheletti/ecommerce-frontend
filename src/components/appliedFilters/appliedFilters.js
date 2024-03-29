import React,{ useRef,createRef,useEffect } from "react"
// Redux
import { store } from "../../state/store"
// Filters
import '../../css/filters.css'
// Functions
import { createFilterData } from '../filters/functions/createFilterData'
import { removeAppliedFilter } from "./functions/removeAppliedFilter";
// Router

export const AppliedFilters = (filters) => {

    const appliedFilters      = store.getState().appliedFiltersReducer
    const filtersNames        = createFilterData(filters)

    return (
        
        <div className="applied-filters-wraper">
            <div className="selected-filters-text-container">
                <div className="selected-filters-text">Selected Filters</div>
            </div>
            <div className="selected-filters-list-container">
            {   
                appliedFilters["price"]
                    ?   appliedFilters["price"]["min"] || appliedFilters["price"]["max"] 
                            ?   <div onClick={()=> removeAppliedFilter({"filter_name":"price"},filtersNames,filters)} style={{backgroundColor:"transparent"}} className="applied-filter">
                                    <div>${appliedFilters["price"]["min"]}</div>
                                    <div>-</div>
                                    <div>{appliedFilters["price"]["max"]}</div>
                                    <svg className="applied-filter-remove-svg" viewBox="0 0 1024 1024"><g><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                </div>
                            : <></>
                    :   <></>
            }
            {
                appliedFilters["properties"]
                    ? Object.keys(appliedFilters["properties"]).map( (key,index) => {

                        const filterToRemove = {"filter_name":key,
                                                "filter_value":appliedFilters["properties"][key]}
                        const optionName = key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," ")
                        
                        return (
                            
                            <div onClick={()=> removeAppliedFilter(filterToRemove,filtersNames,filters)} style={{backgroundColor:"transparent"}} className="applied-filter">
                                <div className="applied-filter-container">
                                    <div className="filter-option-name-value-container">
                                        <div>{optionName}</div>
                                        <div className="filter-option-value">{appliedFilters["properties"][key]}</div>
                                    </div>
                                    <svg className="applied-filter-remove-svg" viewBox="0 0 1024 1024"><g><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                </div>
                            </div>
                        )
                        })
                    : <></>

            }
            </div>
        </div>
        
    )
}
