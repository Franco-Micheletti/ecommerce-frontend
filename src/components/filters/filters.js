// REACT
import React,{useEffect,useRef,useState} from "react";
// CSS
import '../../css/filters.css'
// COMPONENTS
import { AppliedFilters } from "../appliedFilters/appliedFilters";
// REDUX
import { store } from "../../state/store";
import { useDispatch,useSelector } from "react-redux";
import { setMaxPrice,setMinPriceValue,setMaxPriceValue } from "../../state/filters/filtersSlices";
// ROUTER
import { useSearchParams,useNavigate,createSearchParams } from 'react-router-dom';
// UTILITIES
import { history } from "../../utilities/customHistoryObject";
// FUNCTIONS
import { toggleFilterValues } from './functions/toggleFilterValues.js'
import { createFilterData } from './functions/createFilterData.js'
import { addPriceFilter,addPriceFilterMobile } from "./functions/addPriceFilter";
import { removeAppliedFilter } from "../appliedFilters/functions/removeAppliedFilter";
import { handleFilterClick } from "./functions/handleSelectFilterValue";

const Filters = (filters) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    history.navigate = useNavigate();
    const priceSliderMin = useRef()
    const priceSliderMax = useRef()
    // Create object with values of each filter to be used by handleShowFilter function
    const filtersNames = createFilterData(filters)
    // Get appliedFilters
    const appliedFilters = store.getState().appliedFiltersReducer
    // Price Range States
    const maxPrice      = useSelector( (store) => store.maxPriceFilterReducer)
    const minPriceValue = useSelector( (store) => store.minPriceValueReducer)
    const maxPriceValue = useSelector( (store) => store.maxPriceValueReducer)

    useEffect(() => {
        
        priceSliderMin.current.addEventListener("mouseup",addPriceFilter)
        priceSliderMax.current.addEventListener("mouseup",addPriceFilter)
        priceSliderMin.current.addEventListener("touchend",addPriceFilterMobile)
        priceSliderMax.current.addEventListener("touchend",addPriceFilterMobile)

        return () => {
            if (priceSliderMin.current !== null && priceSliderMax.current !== null) {
                // Desktop
                priceSliderMin.current.removeEventListener("mouseup",addPriceFilter)
                priceSliderMax.current.removeEventListener("mouseup",addPriceFilter)
                // Mobile
                priceSliderMin.current.addEventListener("touchend",addPriceFilterMobile)
                priceSliderMax.current.addEventListener("touchend",addPriceFilterMobile)
            }
        }
    }, [])
    
    useEffect(() => {
        
        if (filters["filters"]) {
            dispatch(setMaxPrice(filters["filters"]["price"]["max_price"]))
            dispatch(setMaxPriceValue(filters["filters"]["price"]["max_price"]))
        }

        return(
            () => {
                document.body.style.position = "static"
            }
        )
    },[filters])
    
    return (
        
        <div id="filters-container" className="filters-container">
            
            <AppliedFilters filters={filters["filters"]} filtersNames={filtersNames}/>
            <div className="filters-features-container">
                {   
                    filters["filters"]
                            
                        ?   
                            (Object.keys(filters["filters"]).map(function(filter, filterIndex) {

                            const filterTitle = filter.charAt(0).toUpperCase()+filter.slice(1).replaceAll("_"," ")
                            const maxPriceValue = store.getState().maxPriceValueReducer
                            
                            return (
                                <div key={filterIndex} >
                                    <div key={filterIndex} 
                                         id={filter} 
                                         className="filter-container"
                                         style={{
                                                borderBottom: ( ( appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ) || appliedFilters[filter] ) ? "none" : "0.1px solid rgb(96, 96, 96)"
                                                }}>
                                        <div className="filters-title">{filterTitle}</div>
                                        <div id={filter+"toggle"} 
                                             onClick={() => toggleFilterValues(filter,filtersNames)} 
                                             className="expand-filter-options-container"
                                             style={{transform: ( ( appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ) || appliedFilters[filter] ) ? "rotate(180deg)" : "none"}}> 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(56 60 75);"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="transition-inline">
                                    { 
                                    Object.keys(filters["filters"][filter]).map(function(attribute, keyIndex) {
                                        const filterToApply = {"filter_name":filter,
                                                               "filter_value":attribute}
                                        const capitalAttributeName = attribute.charAt(0).toUpperCase()+attribute.slice(1)
                                        
                                        return(
                                            filter !== "price"
                                            
                                            ?  <div key={attribute+keyIndex} 
                                                    id={filter+attribute} 
                                                    className="filter-items" 
                                                    style={{
                                                            display: appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ? "inline-flex" : "none",
                                                            marginLeft: appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ? "inline-flex" : "none"
                                                           }}>
                                                    
                                                    <div style={{display:"inline-flex",width:"40px"}}>
                                                        <div>
                                                            <input 
                                                                id={"radio"+filter+attribute} 
                                                                onClick={() => handleFilterClick(filterToApply,filters,filtersNames)} 
                                                                className="radio-button" 
                                                                type="radio" 
                                                                name={filter} 
                                                                value={filter+attribute}></input>
                                                        </div>
                                                        <div style={{display:"inline-flex"}}>
                                                            <label id={"label"+filter+keyIndex} className="custom-radio-button" htmlFor={"radio"+filter+attribute} 
                                                            style={{
                                                                backgroundColor: appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) && appliedFilters["properties"][filter] === attribute ? "#2a7dca" : "transparent"
                                                            }}>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="space-between">
                                                        <div className="filter-items-text">{capitalAttributeName}</div>
                                                        <div className="num-result">{filters["filters"][filter][attribute]}</div>
                                                    </div>
                                                </div>

                                            :   <div key={attribute+keyIndex} 
                                                     id={filter+"slider"} 
                                                     className="price-range-container" 
                                                     style={{
                                                            display: ( ( appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ) || appliedFilters[filter] ) ? "inline-grid" : "none",
                                                            marginLeft: ( ( appliedFilters["properties"] && appliedFilters["properties"].hasOwnProperty(filter) ) || appliedFilters[filter] ) ? "inline-flex" : "none"
                                                        }}>
                                                    <label >${minPriceValue} - ${maxPriceValue} </label>
                                                    <div className="price-slider-container">
                                                        <label>Min</label>
                                                        <input
                                                            ref={priceSliderMin} 
                                                            className="price-slider-min" 
                                                            id="price-slider-min" 
                                                            onChange={ function (e) {dispatch(setMinPriceValue(e.target.value))} }
                                                            step={(Math.round(maxPrice,2)/50)} 
                                                            type="range" 
                                                            min={0} 
                                                            max={maxPriceValue} 
                                                            value={minPriceValue}>
                                                        </input>
                                                    </div>
                                                    <div className="price-slider-container">
                                                        <label>Max</label>
                                                        <input
                                                            ref={priceSliderMax} 
                                                            className="price-slider-max" 
                                                            id="price-slider-max"
                                                            onChange= { function (e) {dispatch(setMaxPriceValue(e.target.value))} }
                                                            step={(Math.round(maxPrice,2)/50)} 
                                                            type="range" 
                                                            min={minPriceValue} 
                                                            max={maxPrice+(Math.round(maxPrice,2)/50)} 
                                                            value={maxPriceValue}>
                                                        </input>
                                                    </div>
                                                </div>
                                        )
                                    })
                                    
                                    }
                                    </div>
                                </div>
                            )
                            }))
                        :(<></>)
                }     
            </div>
        </div>
    )

};

export default Filters;