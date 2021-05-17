import {connect} from 'react-redux'
import Category from '../component/filter/category/index'
import {FilterCategory,ClearCategory} from '../actions/category'
import {ToTalProduct} from '../actions/product'


const mapStatesToProps = (state) =>{
    return {
        category:state.category
    }
}
const mapActionsToProps = {
    FilterCategory,
    ClearCategory,
    ToTalProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Category)