import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from '../filter/category/index'
import Type from '../filter/type/index'
import Header from '../header/index'
import Product from '../product/index'
import Brand from '../filter/brand'
import './index.scss'
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            idCategory: {
                idCategory:1,
                idDetailCategory:null
            },
            idType:[],
            idBrand:[],
        }
    }
    componentDidMount(){
        const url = `http://localhost:3000/products?category=${this.state.idCategory.idCategory}`;
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
            this.setState({product:data})
        })
    }
    getProduct = (product) => {
       this.setState({
           product:product
       })
    }
    getIDCategory = (id) =>{
        this.setState({
            idCategory:id
        })
    }
    getIDType = (id) => {
        this.setState({
            idType:id
        })
    }
    getIDBrand = (id) => {
        this.setState({
            idBrand:id
        })
    }
    render() {
        const {idCategory,idType,product} = this.state
        return (
            <div>
                <Header></Header>
               <div className="content">
               <div className="container">
                    <div className="row">
                        <div className="col-3 col-sm-3">
                        <Category getProduct={this.getProduct} getIDCategory={this.getIDCategory}></Category>
                        <Type idCategory={idCategory} getProduct={this.getProduct}  getIDType={this.getIDType} ></Type>
                        <Brand idCategory={idCategory} idType={idType} getProduct={this.getProduct} getIDBrand={this.getIDBrand}></Brand>

                        </div>
                        <div className="col-9 col-sm-9">
                                <Product product={product}></Product>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;