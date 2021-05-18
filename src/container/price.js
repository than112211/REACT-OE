import {connect} from 'react-redux'
import Price from '../component/filter/price/index'
import {FilterPrice} from '../actions/price'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ResetPage} from '../actions/pagination'
import {SetFilter} from '../actions/home'


const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        rating:state.rating,
        price:state.price,
        pagination:state.pagination
    }
}
const mapActionsToProps = {
    SetFilter,
    ResetPage,
    FilterPrice,
    ToTalProduct,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Price)