import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.scss'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            category: [],
            idCategory: 1,
            idDetailCategory:null
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
        if(prevState.idCategory !== this.state.idCategory || prevState.idDetailCategory !== this.state.idDetailCategory ){
        const url = `http://localhost:3000/products?category=${this.state.idCategory}${this.state.idDetailCategory ?`&detail_category=${this.state.idDetailCategory}`:``}`;
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
              this.props.getProduct(data)
              this.props.getIDCategory({
                  idCategory:this.state.idCategory,
                  idDetailCategory:this.state.idDetailCategory
              })
          
        })
    }
    }
    handleClickCategory(id){
        this.setState({
            idCategory:id,
            idDetailCategory:null
        })
    }
    handleClickDetailCategory(id){
        this.setState({
            idDetailCategory:id
        })
    }
    render() {
        const {category,idCategory} = this.state
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