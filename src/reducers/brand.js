
const Brand =  (state = {} ,action) => {
    switch (action.type){
        case 'FILTERBRAND' : {
          state = action.payload
        return state
        }
        case 'CLEARBRAND' : {
          state = {}
        return state
        }
        default : return state
    }
}
export default Brand