import {connect} from 'react-redux'
import Category from '../component/filter/category/index'
import {FilterCategory,ClearCategory} from '../actions/category'
import {ClearType} from '../actions/type'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'

const mapStatesToProps = (state) =>{
    console.log(state)
    return {
        category:state.category,
        pagination:state.pagination
    }
}
const mapActionsToProps = {
    ClearPrice,
    ClearRating,
    FilterCategory,
    ClearCategory,
    ToTalProduct,
    ClearType,
    ClearBrand,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Category)