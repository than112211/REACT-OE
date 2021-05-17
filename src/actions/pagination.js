export const FilterPagination = (page) => {
    return {
        type: 'FILTERPAGINATION',
        payload:page
    }
}
export const ClearPagination = () => {
    return {
        type: 'CLEARPAGINATION',
    }
}


