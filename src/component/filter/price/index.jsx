import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Price extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            values: [0,100,300,600,1000],
            idPrice:null
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
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idBrand,idType,idRating} = this.props

        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}${idRating ? `&rating=${idRating}` : ``}`;
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
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idBrand,idType,idRating} = this.props
        const {idPrice,values} = this.state
        if(prevProps.idCategory.idCategory !== idCategory || prevProps.idCategory.idDetailCategory !== idDetailCategory || prevProps.idType !== idType || prevProps.idBrand !== idBrand || prevProps.idRating !== idRating){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}${idRating ? `&rating=${idRating}` : ``}`;
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

        if(prevState.idPrice !== idPrice){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}${idRating ? `&rating=${idRating}` :``}${idPrice ? `&price_gte=${values[idPrice-1]+1}`: values[idPrice] ? `&price_lte=${values[idPrice]}` :``}`
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
                this.props.getProduct(data)
                this.props.getIDPrice([values[idPrice-1]+1,values[idPrice] ? values[idPrice] : null])
            })
        }
    }
    handleClickPrice(id){
        this.setState({
            idPrice:id
        })
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
    idType:PropTypes.array,
    idBrand:PropTypes.array,
    idRating:PropTypes.number,
    getIDPrice:PropTypes.func,
};

export default Price;