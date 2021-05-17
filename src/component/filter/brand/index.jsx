import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Brand extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            brand:[],
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
        let number = 0
        this.state.product.map(product =>{
            if(product.brand == id) number+=1
        })
       return number
    }
    componentDidMount(){
        const {idCategory,idDetailCategory} = this.props.category
        const {type} = this.props
        const url = `http://localhost:3000/brands?category_id=${idCategory}`;
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
            this.setState({brand:data[0].brand})
        })
        
        const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}`;
         
        fetch(url1,option)
        .then(response => response.json())
        .then(data => {  
            this.setState({
                product:data
            })     
        })
    }
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.category
        const {type,ToTalProduct,brand,pagination,CountProduct} = this.props
        if(prevProps.category.idCategory !== idCategory || prevProps.category.idDetailCategory !== idDetailCategory || prevProps.type !== type){
            const url = `http://localhost:3000/brands?category_id=${idCategory}`;
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
                this.setState({brand:data[0].brand})     
            })
            const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}`;
         
            fetch(url1,option)
            .then(response => response.json())
            .then(data => {  
                this.setState({
                    product:data
                })     
            })
            this.inputBrand = (element) =>{
                if(element){
                    if(element.checked== true){
                        element.checked=false
                    }
                }
             }
        }

        if(prevState.brand !== brand || prevProps.pagination.page !== pagination.page){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${brand ? this.handleBrandChecked(brand) :`` }&_page=${pagination.page}&_limit=${pagination.limit}`;
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
    handleChangeCheckTBrand(e,id){
        const {RemoveBrand,AddBrand,ClearRating,ClearPrice} = this.props
        if(e.target.checked) {
            AddBrand(id)
            ClearRating()
            ClearPrice()
            }
        else {
            RemoveBrand(id)
        }
    }
    render() {
        const {brand} = this.state
        return (
            <div className="filter type">
                <h1 className="title__filter">Brand</h1>
                <ul>
                        {brand.map((brand,index) =>{
                            return <div className="filter__item brand__item" style={{display : this.handleTotalProduct(index+1) > 0  ? 'block' : 'none'}}>
                                    <li > <input ref={this.inputBrand} onChange={ (event) => this.handleChangeCheckTBrand(event,index+1)}  type="checkbox"></input>{brand.name} 
                                        ({this.handleTotalProduct(index+1)})
                                    </li>
                                </div>
                        
                        })}
                </ul>
            </div>
        )}
}

Brand.propTypes = {
    idCategory:PropTypes.object,
    getProduct:PropTypes.func,
    getIDBrand:PropTypes.func,
    idType:PropTypes.array,
    filter:PropTypes.bool,
};

export default Brand;