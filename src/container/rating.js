import {connect} from 'react-redux'
import Rating from '../component/filter/rating/index'
import {FilterRating} from '../actions/rating'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearPrice} from '../actions/price'


const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        rating:state.rating,
        pagination:state.pagination

    }
}
const mapActionsToProps = {
    ClearPrice,
    FilterRating,
    ToTalProduct,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Rating)