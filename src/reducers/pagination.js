const page = {
    page:1,
    litmit:9
}
const Pagination =  (state = page ,action) => {
    switch (action.type){
        case 'FILTERPAGINATION' : {
          state = action.payload
        return state
        }
        case 'CLEARPAGINATION' : {
           state = {}
        return state
        }
    
        default : return state
    }
}
export default Pagination