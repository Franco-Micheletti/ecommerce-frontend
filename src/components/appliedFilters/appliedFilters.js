import React,{ useRef,createRef,useEffect } from "react"
// Redux
import { store } from "../../state/store"
import { removeFilter,setUrlFiltersString } from "../../state/products/productsSlices";
// Filters
import '../../css/filters.css'
// Functions
import { handleMouseOverFilter } from "./functions/handleMouseOverFilter"
import { handleMouseOutOfFilter } from "./functions/handleMouseOutOfFilter"
import { createFilterData } from '../filters/functions/createFilterData'
import { toggleFilterValues}  from "../filters/functions/toggleFilterValues";
// Router
import {useNavigate,createSearchParams} from "react-router-dom"

export const AppliedFilters = (filters) => {

    const appliedFilters      = store.getState().appliedFiltersReducer
    const wrapersFeatures     = useRef([]);
    const removeFilterButtons = useRef([]);
    const navigate            = useNavigate()
    const filtersNames        = createFilterData(filters)

    useEffect(() => {
        if(Object.keys(appliedFilters).length !== 0 ) {
            let objectLength = appliedFilters["properties"].length
            wrapersFeatures.current = wrapersFeatures.current.slice(0, objectLength)
            removeFilterButtons.current = removeFilterButtons.current.slice(0, objectLength)
        }
    }, [appliedFilters])

    const removeAppliedFilter = (filterToRemove) => {

        // Update applied filters
        store.dispatch(removeFilter(filterToRemove))
        const appliedFilters = store.getState().appliedFiltersReducer
        // Update url
        store.dispatch(setUrlFiltersString(appliedFilters))
        const filterString   = store.getState().urlFiltersStringReducer
        // Get search input
        const searchInput = store.getState().stringInputReducer
        // Navigate
        const params = { q: searchInput, page: '1',filters:filterString};
        navigate({
            pathname: '/search/',
            search: `?${createSearchParams(params)}`,
        });
        // Remove old filter selected css
        const filterName = filterToRemove["filter_name"]
        const propertiesValues = Object.keys(filters["filters"][filterName]).length
        
        for (let number = 0;number<propertiesValues;number++) {
            const otherButton = document.getElementById("label"+filterName+number)
            otherButton.style.backgroundColor = "transparent"
        }

        toggleFilterValues(filterName,filtersNames)

    }
    return (
        
        <div className="applied-filters-wraper">
            <div className="selected-filters-text-container">
                <div className="selected-filters-text">Selected Filters</div>
            </div>
            <div className="selected-filters-list-container">
            {   
                appliedFilters["price"] 
                    ? <div className="applied-filter">
                        <div style={{marginLeft:"10px"}}>${appliedFilters["price"]["min"]}</div>
                        <div>-</div>
                        <div style={{marginRight:"10px"}}>${appliedFilters["price"]["max"]}</div>
                    </div>
                    : <></>
            }
            {
                appliedFilters["properties"]
                    ? Object.keys(appliedFilters["properties"]).map( (key,index) => {

                        console.log("APPLIED FILTER KEY",key)
                        console.log("APPLIED FILTER VALUE",appliedFilters["properties"][key])
                        const filterToRemove = {"filter_name":key,
                                                "filter_value":appliedFilters["properties"][key]}
                        const optionName = key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," ")
                        
                        return (
                            
                            <div style={{backgroundColor:"transparent"}} onMouseOver={ () => handleMouseOverFilter(wrapersFeatures.current[index],removeFilterButtons.current[index])} onMouseOut= { () => handleMouseOutOfFilter(wrapersFeatures.current[index],removeFilterButtons.current[index])}className="applied-filter">
                                <div className="remove-filter-button" ref={el => removeFilterButtons.current[index] = el} onClick={()=> removeAppliedFilter(filterToRemove)} >
                                    <img className="remove-filter-button-image" src={require(`../../images/remove-filter.png`)}></img>
                                </div>
                                <div ref={el => wrapersFeatures.current[index] = el} className="wraper-remove-applied-filter">
                                    <div className="applied-filter-container">
                                        <div>{optionName}</div>
                                        <div className="filter-option-value">{appliedFilters["properties"][key]}</div>
                                    </div>
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
