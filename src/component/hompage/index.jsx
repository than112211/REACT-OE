import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Category from '../../container/category'
import Type from '../../container/type'
import Header from '../header/index'
import Product from '../../container/product'
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
            search:null,
            drop:false,
            totalPage:null
        }
    }
    componentDidMount(){
        const {idCategory} = this.props.category
        const {ToTalProduct,pagination,CountProduct} = this.props
        const url = `http://localhost:3000/products?category=${idCategory}&_page=${pagination.page}&_limit=${pagination.limit}`;
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
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.category
        const {ToTalProduct,type,brand,rating,price,pagination,CountProduct} = this.props
        const {search} = this.state
        if(this.state.filter !== prevState.filter && this.state.filter == false ||prevProps.pagination.page !== pagination.page) {
            const url = `http://localhost:3000/products?category=${idCategory}&_page=${pagination.page}&_limit=${pagination.limit}`;
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
        if(this.state.search != prevState.search ||prevProps.pagination.page !== pagination.page){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` :``}${price[0] ? `&price_gte=${price[0]}`: price[1] ? `&price_lte=${price[1]}` :``}&name_like=${search}&_page=${pagination.page}&_limit=${pagination.limit}`
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
    getSearch = (name) =>{
        this.setState({
            search:name
        })
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
    handleClickClearFilter = () => {
        const {ClearBrand,ClearType,ClearRating,ClearPrice,} = this.props
        this.setState({
            filter:false,          
        })
        ClearType()
        ClearBrand()
        ClearRating()
        ClearPrice()
    }
    
    handleClickFilterAsc = () => {
        // let newProduct = product.sort((a,b) => a.price - b.price)
        // ToTalProduct(newProduct)
        const {idCategory,idDetailCategory} = this.props.category
        const {ToTalProduct,type,brand,rating,price} = this.props
        const {search} = this.state
        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` :``}${price[0] ? `&price_gte=${price[0]}`: price[1] ? `&price_lte=${price[1]}` :``}${ search ? `&name_like=${search}`:``}&_sort=price&_order=asc`
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
            ToTalProduct(data)
        })
    }
    handleClickFilterDsc = () => {
        // const {ToTalProduct,product} = this.props
        // let newProduct = product.sort((a,b) => b.price - a.price)
        // ToTalProduct(newProduct)
        const {idCategory,idDetailCategory} = this.props.category
        const {ToTalProduct,type,brand,rating,price} = this.props
        const {search} = this.state
        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}${rating ? `&rating=${rating}` :``}${price[0] ? `&price_gte=${price[0]}`: price[1] ? `&price_lte=${price[1]}` :``}${ search ? `&name_like=${search}`:``}&_sort=price&_order=desc`
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
            ToTalProduct(data)
        })
    }
    toggle = () => {
        this.setState({
            drop:!this.state.drop
        })
    }
    handleClickPage(id){
       
    }
    render() {
        const {filter,drop} = this.state
        const {total,pagination} = this.props
        return (
            <div>
                <Header getSearch={this.getSearch}></Header>
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
                                <Product search={this.state.search} ></Product>
                                <Pagination aria-label="Page navigation example">
                                       
                                        <PaginationItem disabled>
                                            <PaginationLink previous href="#" />
                                        </PaginationItem>
                                       
                                                 {[...Array(total ? Math.ceil(total/pagination.limit) : 1)].map((total,index) =>{
                                                    return   <PaginationItem active={pagination.page == index+1 ? true : false} >
                                                    <PaginationLink onClick={() => handleClickPage(index+1)} >
                                                      {index+1}
                                                    </PaginationLink>
                                                  </PaginationItem>
                        })}
            
                                       
                                        <PaginationItem>
                                            <PaginationLink next href="#" />
                                        </PaginationItem>
                                       
                                        </Pagination>
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