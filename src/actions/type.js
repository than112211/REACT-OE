export const FilterType = (product) => {
    return {
        type: 'FILTERTYPE',
        payload:product
    }
}
export const ClearType = () => {
    return {
        type: 'CLEARTYPE',
    }
}

