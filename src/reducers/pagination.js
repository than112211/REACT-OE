const page = {
    page:2,
    limit:9
}
const Pagination =  (state = page ,action) => {
    switch (action.type){
        case 'PAGINATION' : {
        return {
            ...state,
            page:action.payload
        }
        }
        default : return state
    }
}
export default Pagination