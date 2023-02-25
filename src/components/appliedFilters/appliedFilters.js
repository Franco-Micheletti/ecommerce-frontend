import {React} from "react"
import { store } from "../../state/store"
import '../../css/filters.css'

export const AppliedFilters = () => {
    
    const appliedFilters = store.getState().appliedFiltersReducer
    
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
                appliedFilters["features"]
                    ? Object.keys(appliedFilters["features"]).map( (key,index) => {
                        const optionName = key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_"," ")
                        return (<div className="applied-filter">
                                    <div className="applied-filter-container">
                                        <div>{optionName}</div>
                                        <div className="filter-option-value">{appliedFilters["features"][key]}</div>
                                    </div>
                                </div>)
                        })
                    : <></>

            }
            </div>
        </div>
        
    )
}
