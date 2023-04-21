import React,{useEffect,useRef} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,createSearchParams } from "react-router-dom";
import '../../css/filters.css'
import { toggleFilterValues } from './functions/toggleFilterValues.js'
import { createFilterData } from './functions/createFilterData.js'
import { getStringInputFromLocalStorage } from "../navbar/functions/searchStringLocalStorage";
import { fetchAndApplyFilter } from '../../api/fetchProductsByName'
import { setProducts,setFilters,setUrlFiltersString,addFilter } from "../../state/products/productsSlices";
import { setMaxPrice,setMinPriceValue,setMaxPriceValue } from "../../state/filters/filtersSlices";
import { store } from "../../state/store";
import { AppliedFilters } from "../appliedFilters/appliedFilters";
import { useSearchParams } from 'react-router-dom';
import { setShowMobileFilterContainer } from "../../state/filters/filtersSlices";
import { history } from "../../utilities/customHistoryObject";
import { addPriceFilter } from "./functions/addPriceFilter";
import { removeAppliedFilter } from "../appliedFilters/functions/removeAppliedFilter";

const Filters = (filters) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    history.navigate = useNavigate();

    const priceSlider = useRef()
    const [searchParams,setSearchParams] = useSearchParams()
    // Create object with values of each filter to be used by handleShowFilter function
    const filtersNames = createFilterData(filters)
    // Price Range States
    const maxPrice      = useSelector( (store) => store.maxPriceFilterReducer)
    const minPriceValue = useSelector( (store) => store.minPriceValueReducer)
    const maxPriceValue = useSelector( (store) => store.maxPriceValueReducer)
    
    useEffect(() => {
        
        priceSlider.current.addEventListener("mouseup",addPriceFilter)

        return () => {
            if (priceSlider.current !== null) {
                priceSlider.current.removeEventListener("mouseup",addPriceFilter)
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
                dispatch(setShowMobileFilterContainer(false))
                document.body.style.position = "static"
            }
        )
    },[filters])
    
    const handleFilterClick = (filterToApply,toggleActiveId,filterOptionsLength) => {
        // Check if the same filter already exist, if so remove it
        const appliedFiltersList = store.getState().appliedFiltersReducer
        if (
             appliedFiltersList.hasOwnProperty("properties") && 
             appliedFiltersList["properties"].hasOwnProperty(filterToApply["filter_name"]) === true && 
             filterToApply["filter_value"] === appliedFiltersList["properties"][filterToApply["filter_name"]]
            ) {
                removeAppliedFilter(filterToApply,filtersNames,filters)
        } else {
            // Set body back to static
            document.body.style.position = "static"
            // Add filter to the filters applied list
            dispatch(addFilter(filterToApply))
            const appliedFilters = store.getState().appliedFiltersReducer
            dispatch(setUrlFiltersString(appliedFilters))
            const filterString = store.getState().urlFiltersStringReducer
            const searchInput  = searchParams.get("q" || "")
            // Navigate
            const params = { q: searchInput, page: '1',filters:filterString}
            navigate({
                pathname: '/search/',
                search: `?${createSearchParams(params)}`,
            })
            
            for (let number = 0;number<filterOptionsLength;number++) {
                const otherButton = document.getElementById("label"+filterToApply["filter_name"]+number)
                otherButton.style.backgroundColor = "transparent"
                
            }
            
            const radioButtonLabel = document.getElementById(toggleActiveId)
            if (radioButtonLabel.style.backgroundColor === "#2a7dca") {
                radioButtonLabel.style.backgroundColor = "transparent"
            } else {
                radioButtonLabel.style.backgroundColor = "#2a7dca"
            }
        }
    }
        

    
    
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
                                <>  
                                    <div key={filter} id={filter} style={{borderBottom:"0.1px solid rgb(96, 96, 96)"}} className="filter-container">
                                        <div className="filters-title">{filterTitle}</div>
                                        <div id={filter+"toggle"} onClick={() => toggleFilterValues(filter,filtersNames)} className="expand-filter-options-container"> 
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

                                            ?  <div key={attribute} id={filter+attribute} className="filter-items" style={{display:"None"}}>
                                                    <div style={{display:"inline-flex",width:"40px"}}>
                                                        <div>
                                                            <input 
                                                                id={"radio"+filter+attribute} 
                                                                onClick={() => handleFilterClick(filterToApply,"label"+filter+keyIndex,Object.keys(filters["filters"][filter]).length)} 
                                                                className="radio-button" 
                                                                type="radio" 
                                                                name={filter} 
                                                                value={filter+attribute}></input>
                                                        </div>
                                                        <div style={{display:"inline-flex"}}>
                                                            <label id={"label"+filter+keyIndex} className="custom-radio-button" htmlFor={"radio"+filter+attribute}></label>
                                                        </div>
                                                    </div>
                                                    <div className="space-between">
                                                        <div className="filter-items-text">{capitalAttributeName}</div>
                                                        <div className="num-result">{filters["filters"][filter][attribute]}</div>
                                                    </div>
                                                </div>

                                            :   <div ref={priceSlider} key={attribute} id={filter+"slider"} className="price-range-container" style={{display: "None"}}>
                                                    <label >${minPriceValue} - ${maxPriceValue} </label>
                                                    <div className="price-slider-container">
                                                        <label>Min</label>
                                                        <input 
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
                                </>
                            )
                            }))
                        :(<></>)
                }     
            </div>
        </div>
    )

};

export default Filters;