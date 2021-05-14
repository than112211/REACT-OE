import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Brand extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            brand:[],
            idBrandCheck:[]
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
        const {idCategory,idDetailCategory} = this.props.idCategory
        

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
        
        const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(this.props.idType) ? this.handleTypeChecked(this.props.idType) : ``}`;
         
        fetch(url1,option)
        .then(response => response.json())
        .then(data => {  
            this.setState({
                product:data
            })     
        })
    }
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idBrandCheck,product} = this.state
        if(prevProps.idCategory.idCategory !== idCategory || prevProps.idCategory.idDetailCategory !== idDetailCategory || prevProps.idType !== this.props.idType){
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
            const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(this.props.idType) ? this.handleTypeChecked(this.props.idType) : ``}`;
         
            fetch(url1,option)
            .then(response => response.json())
            .then(data => {  
                this.setState({
                    product:data
                })     
            })
        }

        if(prevState.idBrandCheck !== idBrandCheck){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(this.props.idType) ? this.handleTypeChecked(this.props.idType) : ``}${idBrandCheck ? this.handleBrandChecked(idBrandCheck) :`` }`;
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
                this.props.getIDBrand(idBrandCheck)
                this.props.getProduct(data)
            })
        }
    }
    handleChangeCheckTBrand(e,id){
        const {idBrandCheck} = this.state
        if(e.target.checked) {
            this.setState({
                //update state
                //ES6 tương tự .push array
                idBrandCheck : [...idBrandCheck,id]
            })

        }
        else {
            let newid = [...idBrandCheck]
            newid.splice(idBrandCheck.indexOf(id),1)
            this.setState({
                idBrandCheck:newid
            })
        }
    }
    render() {
        const {brand} = this.state
        return (
            <div className="filter type">
                <h1 className="title__filter">Type</h1>
                <ul>
                        {brand.map((brand,index) =>{
                            return <div className="filter__item brand__item" style={{display : this.handleTotalProduct(index+1) > 0  ? 'block' : 'none'}}>
                                    <li > <input onChange={ (event) => this.handleChangeCheckTBrand(event,index+1)}  type="checkbox"></input>{brand.name} 
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
};

export default Brand;