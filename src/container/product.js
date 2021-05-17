import {connect} from 'react-redux'
import Product from '../component/product/index'


const mapStatesToProps = (state) =>{
    return {
        product:state.product.product
    }
}
const mapActionsToProps = {
   
}
export default connect(mapStatesToProps,mapActionsToProps)(Product)