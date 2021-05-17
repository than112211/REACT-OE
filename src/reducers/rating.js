
const Rating =  (state = {} ,action) => {
    switch (action.type){
        case 'FILTERRATING' : {
          state = action.payload
        return state
        }
        case 'CLEARRATING' : {
          state = {}
        return state
        }
    
        default : return state
    }
}
export default Rating