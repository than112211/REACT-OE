import {connect} from 'react-redux'
import Rating from '../component/filter/rating/index'
import {FilterRating} from '../actions/rating'
import {ToTalProduct} from '../actions/product'


const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        rating:state.rating
    }
}
const mapActionsToProps = {
    FilterRating,
    ToTalProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Rating)