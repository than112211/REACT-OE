import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.scss'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: [],
            idCategory: 1,
        }
    }
//goi lần đầu duy nhất
    componentDidMount(){
        const url = 'http://localhost:3000/categories';
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
            this.setState({category:data})
        })
    }
    // sau khi render xong thi moi goi , state thay đổi thì gọi lại
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.category
        const {ToTalProduct} = this.props
        if(prevState.idCategory !== idCategory || prevState.idDetailCategory !== idDetailCategory ){
        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ?`&detail_category=${idDetailCategory}`:``}`;
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
    }
    handleClickCategory(id){
        this.setState({
            idCategory:id,
        })
        this.props.FilterCategory({
            idCategory:id,
            idDetailCategory:null
          })
    }
    handleClickDetailCategory(id){
        this.props.FilterCategory({
            idCategory:this.state.idCategory,
            idDetailCategory:id
          })
    }
    render() {
        const {idCategory} = this.props.category
        const {category} = this.state
        return (
            <div className="filter category">
                <h1 className="title__filter">Category</h1>
               <ul>
                    {category.map((category,index) =>{
                        return <div className="filter__item category__item">
                                <li onClick={() => this.handleClickCategory(index+1)}>{category.name}
                                
                                </li>
                                <ul style={{display : (idCategory && idCategory == index + 1) ? 'block' : 'none'}}>
                                    {category.detail_category.map((detail,i) =>{
                                        return <li  onClick={() => this.handleClickDetailCategory(i+1)}>{detail.name}</li>
                                    })}
                                </ul>
                            </div>
                       
                    })}
               </ul>
            </div>
        );
    }
}

Category.propTypes = {
    getProduct:PropTypes.func,
    getIDCategory:PropTypes.func,
};

export default Category;