
const Product =  (state = [] ,action) => {
    switch (action.type){
        case 'SET_PRODUCT' : {
            console.log(action.payload)
        return action.payload
        }
        default : return state
    }
}
export default Product