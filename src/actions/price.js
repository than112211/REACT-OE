export const FilterPrice = (product) => {
    return {
        type: 'FILTERPRICE',
        payload:product
    }
}
export const ClearPrice = () => {
    return {
        type: 'CLEARPRICE',
    }
}

