import {connect} from 'react-redux'
import Home from '../component/hompage/index'
import {ToTalProduct,CountProduct} from '../actions/product'
import {ClearBrand} from '../actions/brand'
import {ClearType} from '../actions/type'
import {ClearRating} from '../actions/rating'
import {ClearPrice} from '../actions/price'
import {NextPage,PrePage,FilterPagination,ResetPage} from '../actions/pagination'
import {ClearCategory} from '../actions/category'
import {ClearFilter} from '../actions/home'
const mapStatesToProps = (state) =>{
    console.log(state)
    return {
        category:state.category,
        type:state.type,
        brand:state.brand,
        rating:state.rating,
        price:state.price,
        product:state.product.product,
        pagination:state.pagination,
        total:state.product.total,
        filter:state.home
        
    }
}
const mapActionsToProps = {
    ClearFilter,
    ClearCategory,
    FilterPagination,
    PrePage,
    ResetPage,
    NextPage,
    ToTalProduct,
    ClearBrand,
    ClearType,
    ClearRating,
    ClearPrice,
    CountProduct,
}
export default connect(mapStatesToProps,mapActionsToProps)(Home)