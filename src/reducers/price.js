
const Price =  (state = {} ,action) => {
    switch (action.type){
        case 'FILTERPRICE' : {
          state = action.payload
        return state
        }
        case 'CLEARPRICE' : {
            state = {}
          return state
          }
        default : return state
    }
}
export default Price