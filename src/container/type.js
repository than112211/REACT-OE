import {connect} from 'react-redux'
import Type from '../component/filter/type/index'
import {AddType,RemoveType,ClearType} from '../actions/type'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'
import {ResetPage} from '../actions/pagination'
import {SetFilter} from '../actions/home'

const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        pagination:state.pagination
    }
}
const mapActionsToProps = {
    SetFilter,
    ResetPage,
    ClearPrice,
    ClearRating,
    AddType,
    RemoveType,
    ClearType,
    ClearBrand,
    ToTalProduct,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Type)