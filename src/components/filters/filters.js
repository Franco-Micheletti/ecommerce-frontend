import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useFetcher, useNavigate } from "react-router-dom";
import '../../css/filters.css'
import handleShowFilter from './functions/toggleFilterValues.js'
import createFilterData from './functions/createFilterData.js'
import { fetchAndApplyFilter } from '../../api/fetchProductsByName'
import { addFilter } from "../../state/products/productsSlices";
import { setUrlFiltersString } from "../../state/products/productsSlices";
import { setProducts } from "../../state/products/productsSlices";
import { setFilters } from "../../state/products/productsSlices";
import { store } from "../../state/store";


const Filters = (filters) => {
    
    const navigate = useNavigate()
    // States
    const dispatch = useDispatch()
    const appliedFilters = useSelector( (store) => store.appliedFiltersReducer)
    const searchInput = useSelector( (store) => store.stringInputReducer)
    

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

    const handleFilterClick = async (filterToApplied,toggleActiveId,filterOptionsLength) => {
        
        dispatch(addFilter(filterToApplied)) // Aca el problema
        const appliedFiltersState = store.getState().appliedFiltersReducer
        dispatch(setUrlFiltersString(appliedFiltersState))
        const urlString = store.getState().urlFiltersStringReducer
        const data = await fetchAndApplyFilter(searchInput,appliedFiltersState)
        if (data) {
            
            dispatch(setProducts(data["products"]))
            const products = store.getState().productsReducer
            dispatch(setFilters(data["filters"]))
            
            
            
            
            
            for (let number = 0;number<filterOptionsLength;number++) {
                const otherButton = document.getElementById("label"+filterToApplied["filter_name"]+number)
                otherButton.style.backgroundColor = "#ffffff"
            }
            
            const radioButtonLabel = document.getElementById(toggleActiveId)
            if (radioButtonLabel.style.backgroundColor === "#2a7dca") {
                radioButtonLabel.style.backgroundColor = "#ffffff"
            } else {
                radioButtonLabel.style.backgroundColor = "#2a7dca"
            }
           
        }
        navigate(`/search/${urlString}`)
        
    }


    return (
        
        <div className="filters-container">
            <div className="applied-filters-wraper">
                <div className="selected-filters-container">
                    <div className="selected-filters-text">Selected Filters</div>
                </div>
                <div className="selected-filters-list-container">
                {
                    Object.keys(appliedFilters).map( (key,index) => {
                        return (<div className="applied-filter">{appliedFilters[key]}</div>)
                    })
                }
                </div>
            </div>
            <div className="filters-features-container">
                {   
                    filters["filters"]
                        ?   (Object.keys(filters["filters"]).map(function(filter, filterIndex) {
                        
                                return (
                                    <>  
                                        <div key={filter} className="filter-container">
                                            <div className="filters-title">{filter.charAt(0).toUpperCase()+filter.slice(1).replace("_"," ")}</div>
                                            <div id={filter+"toggle"} onClick={() => handleShowFilter(filter,filtersNames)} className="expand-filter-options-container"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2097B4"><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path></svg>
                                            </div>
                                        </div>
                                        <div className="transition-inline">
                                            { 
                                                Object.keys(filters["filters"][filter]).map(function(attribute, keyIndex) {
                                                    const filterToApplied = {"filter_name":filter,
                                                                             "filter_value":attribute}
                                                    return(
                                                        filter !== "Price"
        
                                                                ?  <div key={attribute} id={filter+attribute} className="filter-items" style={{display:"None"}}>
                                                                        <div style={{display:"inline-flex",width:"40px"}}>
                                                                            <div>
                                                                                <input id={"radio"+filter+attribute} onClick={() => handleFilterClick(filterToApplied,"label"+filter+keyIndex,Object.keys(filters["filters"][filter]).length,"radio"+filter+attribute)} className="radio-button" type="radio" name={filter} value={filter+attribute}></input>
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