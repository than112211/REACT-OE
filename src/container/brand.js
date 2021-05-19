import {connect} from 'react-redux'
import Brand from '../component/filter/brand/index'
import {AddBrand,ClearBrand,RemoveBrand} from '../actions/brand'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'
import {ResetPage} from '../actions/pagination'
import {SetFilter} from '../actions/home'

const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        pagination:state.pagination
    }
}
const mapActionsToProps = {
    SetFilter,
    ResetPage,
    ClearPrice,
    ClearRating,
    AddBrand,
    RemoveBrand,
    ClearBrand,
    ToTalProduct,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Brand)