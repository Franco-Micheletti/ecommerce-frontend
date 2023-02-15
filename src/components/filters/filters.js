import React,{useState,useEffect,useRef} from "react";
import '../../css/filters.css'
import handleShowFilter from './functions/toggleFilterValues.js'
import createFilterData from './functions/createFilterData.js'


// import {ProductTypeFilters,PriceExpand} from '../html/filtersDetails.jsx'
const Filters = (filters) => {
    
    // Create object with values of each filter to be used by handleShowFilter function
    var filtersNames = createFilterData(filters)
    
    // Price Range States
    const [minPrice,setMinPrice] = useState(0)
    const [maxPrice,setMaxPrice] = useState(100)

    function handlePriceMin(event) {
        setMinPrice(event.target.value)
        // const addPriceFilter = window.addEventListener("mouseup",(e) => {
        //    if (e.button === 0) {
                
        //    }   
        // })
    }

    function handlePriceMax(event) {
        setMaxPrice(event.target.value)
    }

    return (
        
        <div className="filters-container">
            <div className="filters-features-container">
                <div className="selected-filters-container">
                    <div className="selected-filters-text">Selected Filters</div>
                </div>
                <div className="selected-filters-list-container">
                    <div className="applied-filter">$0-30</div>
                    <div className="applied-filter">Condiments</div>
                    <div className="applied-filter">Cookies</div>
                    <div className="applied-filter">Big</div>
                    <div className="applied-filter">In 1day</div>
                    <div className="applied-filter">300g</div>
                    <div className="applied-filter">$0-30</div>
                    <div className="applied-filter">$0-30</div>
                </div>
                {/* FILTERS */}
                
                {   
                    filters["filters"]
                        ?   (Object.keys(filters["filters"]).map(function(filter, filterIndex) {
                        
                                return (
                                    <>  
                                        <div key={filter} className="filter-container">
                                            <div className="filters-title">{filter}</div>
                                            <div id={filter+"toggle"} onClick={() => handleShowFilter(filter,filtersNames)} className="expand-filter-options-container"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                            </div>
                                        </div>
                                        <div className="transition-inline">
                                            { 
                                                Object.keys(filters["filters"][filter]).map(function(attribute, keyIndex) {
                                                    
                                                    return(
                                                        filter !== "Price"
        
                                                                ?  <div key={attribute} id={filter+attribute} className="filter-items" style={{display:"None"}}>
                                                                        <input className="radio-button" type="checkbox" name="filter" value="nuts"></input>
                                                                        <div className="space-between">
                                                                            <div className="filter-items-text">{attribute}</div>
                                                                            <div className="num-result">{filters["filters"][filter][attribute]}</div>
                                                                        </div>
                                                                    </div>
        
                                                                : <div key={attribute} id={filter} className="price-range-container" style={{display: "None"}}>
                                                                        <label >${minPrice}.00 - ${maxPrice}.00 </label>
                                                                        <div className="price-slider-container">
                                                                            <label>Min</label><input className="price-slider-min" id="price-slider-min" onChange={handlePriceMin} step={(Math.round(filters["filters"]["Price"]["max_price"],2)/100)} type="range" min={0} max={maxPrice} value={minPrice}></input>
                                                                        </div>
                                                                        <div className="price-slider-container">
                                                                            <label>Max</label><input className="price-slider-max" id="price-slider-max" onChange={handlePriceMax} step={(Math.round(filters["filters"]["Price"]["max_price"],2)/100)} type="range" min={minPrice} max={filters["filters"][filter]["max_price"]} value={maxPrice}></input>
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