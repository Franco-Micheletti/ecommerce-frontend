import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../css/filters.css'
import handleShowFilter from './functions/toggleFilterValues.js'
import createFilterData from './functions/createFilterData.js'
import { getStringInputFromLocalStorage } from "../navbar/functions/searchStringLocalStorage";
import { addMouseUpEvent } from "./functions/addPriceFilter";
import { fetchAndApplyFilter } from '../../api/fetchProductsByName'
import { setProducts,setFilters,setUrlFiltersString,addFilter } from "../../state/products/productsSlices";
import { setMaxPrice,setMinPriceValue,setMaxPriceValue } from "../../state/filters/filtersSlices";
import { store } from "../../state/store";
import { AppliedFilters } from "../appliedFilters/appliedFilters";


const Filters = (filters) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const appliedFilters = useSelector( (store) => store.appliedFiltersReducer)
    // const searchInput = useSelector( (store) => store.stringInputReducer)
    // Create object with values of each filter to be used by handleShowFilter function
    var filtersNames = createFilterData(filters)
    // Price Range States
    const maxPrice      = useSelector( (store) => store.maxPriceFilterReducer)
    const minPriceValue = useSelector( (store) => store.minPriceValueReducer)
    const maxPriceValue = useSelector( (store) => store.maxPriceValueReducer)

    useEffect(() => {
        
        if (filters["filters"]) {
            dispatch(setMaxPrice(filters["filters"]["price"]["max_price"]))
            dispatch(setMaxPriceValue(filters["filters"]["price"]["max_price"]))
        }
    },[filters])

    const handleFilterClick = (filterToApply,toggleActiveId,filterOptionsLength) => {
        dispatch(addFilter(filterToApply))
        const appliedFilters = store.getState().appliedFiltersReducer
        dispatch(setUrlFiltersString(appliedFilters))
        const urlString = store.getState().urlFiltersStringReducer
        const searchInput = getStringInputFromLocalStorage()
        
        fetchAndApplyFilter(searchInput,urlString)
        
        for (let number = 0;number<filterOptionsLength;number++) {
            const otherButton = document.getElementById("label"+filterToApply["filter_name"]+number)
            otherButton.style.backgroundColor = "#ffffff"
        }
        
        const radioButtonLabel = document.getElementById(toggleActiveId)
        if (radioButtonLabel.style.backgroundColor === "#2a7dca") {
            radioButtonLabel.style.backgroundColor = "#ffffff"
        } else {
            radioButtonLabel.style.backgroundColor = "#2a7dca"
        }
           
        navigate(`/search/${searchInput}/${urlString}`)
        
    }

    return (
        
        <div className="filters-container">
            <AppliedFilters />
            <div className="filters-features-container">
                {   
                    filters["filters"]
                            
                        ?   
                            (Object.keys(filters["filters"]).map(function(filter, filterIndex) {

                            const filterTitle = filter.charAt(0).toUpperCase()+filter.slice(1).replaceAll("_"," ")
                            const maxPriceValue = store.getState().maxPriceValueReducer
                            return (
                                <>  
                                    <div key={filter} className="filter-container">
                                        <div className="filters-title">{filterTitle}</div>
                                        <div id={filter+"toggle"} onClick={() => handleShowFilter(filter,filtersNames)} className="expand-filter-options-container"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="transition-inline">
                                    { 
                                    Object.keys(filters["filters"][filter]).map(function(attribute, keyIndex) {
                                        const filterToApply = {"filter_name":filter,
                                                               "filter_value":attribute}
                                        
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
                                                        <div className="filter-items-text">{attribute}</div>
                                                        <div className="num-result">{filters["filters"][filter][attribute]}</div>
                                                    </div>
                                                </div>

                                            : <div key={attribute} id={filter} className="price-range-container" style={{display: "None"}}>
                                                    <label >${minPriceValue} - ${maxPriceValue} </label>
                                                    <div className="price-slider-container">
                                                        <label>Min</label>
                                                        <input 
                                                            className="price-slider-min" 
                                                            id="price-slider-min" 
                                                            onClick={addMouseUpEvent}
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
                                                            onClick={addMouseUpEvent}
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

}

export default Filters;