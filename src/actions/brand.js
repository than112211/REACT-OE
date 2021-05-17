export const FilterBrand = (product) => {
    return {
        type: 'FILTERBRAND',
        payload:product
    }
}
export const ClearBrand = () => {
    return {
        type: 'CLEARBRAND',
        
    }
}

