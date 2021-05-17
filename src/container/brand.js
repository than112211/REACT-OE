import {connect} from 'react-redux'
import Brand from '../component/filter/brand/index'
import {AddBrand,ClearBrand,RemoveBrand} from '../actions/brand'
import {ToTalProduct} from '../actions/product'
import {ClearRating} from '../actions/rating'


const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
    }
}
const mapActionsToProps = {
    ClearRating,
    AddBrand,
    RemoveBrand,
    ClearBrand,
    ToTalProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Brand)