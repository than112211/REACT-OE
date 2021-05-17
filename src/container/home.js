import {connect} from 'react-redux'
import Home from '../component/hompage/index'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearType} from '../actions/type'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'
import product from './product'


const mapStatesToProps = (state) =>{
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        rating:state.rating,
        price:state.price,
        product:state.product.product,
        pagination:state.pagination,
        total:state.product.total
    }
}
const mapActionsToProps = {
    ToTalProduct,
    ClearBrand,
    ClearType,
    ClearRating,
    ClearPrice,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Home)