import {connect} from 'react-redux'
import Type from '../component/filter/type/index'
import {AddType,RemoveType,ClearType} from '../actions/type'
import {ToTalProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearRating} from '../actions/rating'

const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type
    }
}
const mapActionsToProps = {
    ClearRating,
    AddType,
    RemoveType,
    ClearType,
    ClearBrand,
    ToTalProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Type)