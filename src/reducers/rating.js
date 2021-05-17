
const Rating =  (state = {} ,action) => {
    switch (action.type){
        case 'FILTERRATING' : {
        return action.payload
        }
        case 'CLEARRATING' : {
        return null
        }
        default : return state
    }
}
export default Rating