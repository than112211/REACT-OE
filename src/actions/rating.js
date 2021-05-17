export const FilterRating = (product) => {
    return {
        type: 'FILTERRATING',
        payload:product
    }
}
export const ClearRating = () => {
    return {
        type: 'CLEARRATING',
    }
}

