
const Type =  (state = {} ,action) => {
    switch (action.type){
        case 'FILTERTYPE' : {
          state = action.payload
        return state
        }
        case 'CLEARTYPE' : {
          state = {}
        return state
        }
        default : return state
    }
}
export default Type