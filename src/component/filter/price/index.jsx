import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Price extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            values: [0,100,300,600,1000],
        }
    }
    handleTypeChecked(id){
        var str = ''
       id.map(check => {
            str += `&type=${check}`
        })
        return str    
    }
    handleBrandChecked(id){
        var str = ''
       id.map(check => {
            str += `&brand=${check}`
        })
        return str    
    }
    handleTotalProduct(id){
        const {values} = this.state
        let number = 0
        this.state.product.map(product =>{
            if(product.price >= values[id-1]+1 && product.price <= values[id]) number+=1
        })
       return number
    }
    componentDidMount(){
        const {idCategory,idDetailCategory} = this.props.category
        const {type,brand,rating} = this.props
        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` : ``}`;
        const option = {
            method : 'GET',
            mode : 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
        }
        fetch(url,option)
        .then(response => response.json())
        .then(data => {
            this.setState({
                product:data
            })          
        })
    }
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.category
        const {type,brand,rating,price,ToTalProduct,pagination,CountProduct} = this.props
        if(prevProps.category.idCategory !== idCategory || prevProps.category.idDetailCategory !== idDetailCategory || prevProps.type !== type || prevProps.brand !== brand || prevProps.rating !== rating){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` : ``}`;
            const option = {
                method : 'GET',
                mode : 'cors',
                headers: {
                    'Content-Type' : 'application/json',
                },
            }
            fetch(url,option)
            .then(response => response.json())
            .then(data => {  
                this.setState({
                    product:data
                })               
            })
       
        }

        if(prevState.price !== price || prevProps.pagination.page !== pagination.page){
            console.log(prevState.price !== price)

            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` :``}${price[0] ? `&price_gte=${price[0]}`: ``}${price[1] ? `&price_lte=${price[1]}` :``}&_page=${pagination.page}&_limit=${pagination.limit}`
            const option = {
                method : 'GET',
                mode : 'cors',
                headers: {
                    'Content-Type' : 'application/json',
                },
            }
            fetch(url,option)
            .then(response => {
                CountProduct(response.headers.get('x-total-count'))
                return response.json()
            })
            .then(data => {                
                ToTalProduct(data)
            })
        }
    }
    handleClickPrice(id){
        const {FilterPrice,ResetPage,SetFilter} = this.props
        const {values} = this.state
        FilterPrice([values[id-1]+1,values[id] ? values[id] : null])
        ResetPage()
        SetFilter()
    }
    render() {
        const {values} = this.state
        
        return (
            <div className="filter price">
            <h1 className="title__filter">Price</h1>
                <ul>
                            {values.map((value,index)=>{
                            return <div className="filter__item brand__item" onClick={() => this.handleClickPrice(index + 1)}>
                                     <li >{values[index] + 1}$ - {values[index + 1] ? values[index + 1] : "max"}$ ({this.handleTotalProduct(index+1)})
                                     </li>
                                      
                                </div>
                        
                        })}
                </ul>
               
            </div>
               
        );
    }
}

Price.propTypes = {
    idCategory:PropTypes.object,
    getProduct:PropTypes.func,
    type:PropTypes.array,
    brand:PropTypes.array,
    rating:PropTypes.number,
    getprice:PropTypes.func,
};

export default Price;