import Category from './category'
import Type from './type'
import Product from './product'
import Brand from './brand'
import Rating from './rating'
import Price from './price'
import Search from './search'
import Pagination from './pagination'
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    category:Category,
    type:Type,
    product:Product,
    brand:Brand,
    rating:Rating,
    price:Price,
    search:Search,
    pagination:Pagination,
});

export default rootReducer