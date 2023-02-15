
export const ProductTypeFilters = (attribute,filters,filter) => {
    
    return( 
            <div key={attribute} id={filter+attribute} className="filter-items" style={{display:"None"}}>
                <input className="radio-button" type="checkbox" name="filter" value="nuts"></input>
                <div className="space-between">
                    <div className="filter-items-text">{attribute}</div>
                    <div className="num-result">{filters["filters"][filter][attribute]}</div>
                </div>
            </div>
    )
}
export const PriceExpand = (handlePriceMin,handlePriceMax,minPrice,maxPrice) => {
    
    return( 
            <div className="price-range-container" >
                <label >${minPrice}.00 - ${maxPrice}.00 </label>
                <div className="price-slider-container">
                    <label>Min</label><input className="price-slider-min" id="price-slider-min" onChange={handlePriceMin} step={1} type="range" min={0} max={maxPrice} value={minPrice}></input>
                </div>
                <div className="price-slider-container">
                    <label>Max</label><input className="price-slider-max" id="price-slider-max" onChange={handlePriceMax} step={1} type="range" min={minPrice} max={99} value={maxPrice}></input>
                </div>
            </div>
    )
}




