import {connect} from 'react-redux'
import Category from '../component/filter/category/index'
import {FilterCategory,ClearCategory} from '../actions/category'
import {ClearType} from '../actions/type'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'
import {ResetPage} from '../actions/pagination'
import {SetFilter} from '../actions/home'

const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        pagination:state.pagination
    }
}
const mapActionsToProps = {
    SetFilter,
    ResetPage,
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