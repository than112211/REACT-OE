import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Category from '../../container/category'
import Type from '../../container/type'
import Header from '../header/index'
import Product from '../product/index'
import Brand from '../../container/brand'
import Rating from '../../container/rating'
import Price from '../../container/price'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './index.scss';
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter:false,
            product:[],
            idCategory: {
                idCategory:1,
                idDetailCategory:null
            },
            idType:[],
            idBrand:[],
            idRating:null,
            idPrice:[],
            search:null,
            drop:false,
            
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
    componentDidUpdate(prevProps, prevState){
        if(this.state.filter !== prevState.filter && this.state.filter == false) {
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
    }
    getProduct = (product) => {
       this.setState({
           product:product,
           filter:true
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
    getIDRating = (id) =>{
        this.setState({
            idRating:id
        })
    }
    getIDPrice = (id) =>{
        this.setState({
            idPrice:id
        })
    }
    getSearch = (name) =>{
        this.setState({
            search:name
        })
    }
    handleClickClearFilter = () => {
        this.setState({
            filter:false,
            product:[],
            idCategory: {
                idCategory:1,
                idDetailCategory:null
            },
            idType:[],
            idBrand:[],
            idRating:null
        })
    }
    handleClickFilterAsc = () => {
        const {product} = this.state
        var newProduct = product.sort((a,b) => a.price - b.price)
        this.setState({
            product:newProduct
          
        })
    }
    handleClickFilterDsc = () => {
        const {product} = this.state
        var newProduct = product.sort((a,b) => b.price - a.price)
        this.setState({
            product:newProduct
        })
    }
    toggle = () => {
        this.setState({
            drop:!this.state.drop
        })
    }
  
    render() {
        console.log('redux')
        const {idCategory,idType,idBrand,idRating,idPrice,product,filter,drop,search} = this.state
        return (
            <div>
                <Header idCategory={idCategory} idType={idType} idBrand={idBrand} idRating={idRating} idPrice={idPrice} getProduct={this.getProduct} getSearch={this.getSearch}></Header>
               <div className="content">
               <div className="container">
                    <div className="row">
                    <div className="dropdown__filter">
                        <ButtonDropdown isOpen={drop} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Filter
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleClickFilterAsc}>Price Asc</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleClickFilterDsc}>Price Dsc</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                        <div className="col-3 col-sm-3">
                        <Button className="btn__clear" color="danger" style={{display: filter ? 'block' : 'none'}} onClick={this.handleClickClearFilter}>Clear Filter</Button>
                        <Category ></Category>
                        <Type ></Type>
                        <Brand></Brand>
                        <Rating></Rating>
                        <Price ></Price>
                        </div>
                        <div className="col-9 col-sm-9">
                                <Product product={product} search={search}></Product>
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