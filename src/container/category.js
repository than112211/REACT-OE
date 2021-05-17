import {connect} from 'react-redux'
import Category from '../component/filter/category/index'
import {FilterCategory,ClearCategory} from '../actions/category'
import {ClearType} from '../actions/type'
import {ToTalProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearRating} from '../actions/rating'


const mapStatesToProps = (state) =>{
    return {
        category:state.category
    }
}
const mapActionsToProps = {
    ClearRating,
    FilterCategory,
    ClearCategory,
    ToTalProduct,
    ClearType,
    ClearBrand,
}
export default connect(mapStatesToProps,mapActionsToProps)(Category)