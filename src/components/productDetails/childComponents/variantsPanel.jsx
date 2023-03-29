import React from "react"
import { useDispatch,useSelector } from "react-redux"
import { store } from "../../../state/store"
import { updateVariantOption,setVariantValuePreview } from "../../../state/variants/variantsSlices"
import { getProductVariantId } from "../functions/getProductVariantId"
import { useNavigate } from "react-router-dom"
export const VariantsPanel = ({productData,productName}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const variantOptions       = useSelector((store) => store.variantOptionsReducer)
    const variantValuePreview  = useSelector((store) => store.variantOptionsReducer)

    const handleUpdateVariantOption = (property,value) => {

        const newVariantOption = {"property":property,
                                  "value":value}
        dispatch(updateVariantOption(newVariantOption))
        const variantOptionsUpdated = store.getState().variantOptionsReducer
        const productVariantId = getProductVariantId(productData,variantOptionsUpdated)
        navigate(`/${productName}/${productVariantId}`)
    }

    const handleMouseOverVariantValue = (property,value) => {
        const payloadValuePreview = {"property":property,"value":value}
        dispatch(setVariantValuePreview(payloadValuePreview))
        
    }
    
    return ( 

    <div>
        {
        productData["variant_options"]
            ?   <div className="right-panel-variants">
                    {   
                        Object.keys(productData["variant_options"]).map( (property,index) => {
                            return(
                                <div className="variants-options-container">
                                    <div className="variant-text-preview-container">
                                        <div className="variant-property-text">{property[0].toUpperCase()+property.slice(1)}:</div> 
                                        <div className="variant-value-text">{variantValuePreview[property].toString().toLowerCase()}</div>
                                    </div>
                                    <div className="variant-values-list-container">
                                        {
                                            productData["variant_options"][property].map( (value) => {
                                                if (property === "color"){
                                                    return (
                                                        <div onMouseOver={ () => handleMouseOverVariantValue(property,value)} onClick={()=> handleUpdateVariantOption(property,value)} style={{backgroundColor: value}} className="color-variant-item"></div>
                                                    )
                                                } else {
                                                    return (
                                                        <div onMouseOver={() => handleMouseOverVariantValue(property,value)} onClick={()=> handleUpdateVariantOption(property,value)} className="width-variant-item">{value}"</div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            : <></>
        }
    </div>

    )

}