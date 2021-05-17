import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas, faStar} from '@fortawesome/free-solid-svg-icons'
import '../index.scss'

library.add(fas,faStar)

class Rating extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
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
            if(product.rating == id) number+=1
        })
       return number
    }
    componentDidMount(){
        const {idCategory,idDetailCategory} = this.props.category
        const {type,brand} = this.props
        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}`;
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
        const {type,brand,rating,ToTalProduct}  = this.props
        if(prevProps.category.idCategory !== idCategory || prevProps.category.idDetailCategory !== idDetailCategory || prevProps.type !== type || prevProps.brand !== brand){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(type) ? this.handleTypeChecked(type) : ``}${this.handleBrandChecked(brand) ? this.handleBrandChecked(brand) : ``}`;
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

        if(prevState.rating !== rating){
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
                ToTalProduct(data)
            })
        }
    }
    handleClickRating(id) {
        this.props.FilterRating(id)
    }
    render() {
        const rating = [1,2,3,4,5]
        return (
               <div className="filter rating">
               <h1 className="title__filter">Rating</h1>
              {
                  rating.map((rating,index) =>{
                      return  <div className="filter__item rating__item" onClick = {() => this.handleClickRating(index+1)} >
                                    {
                                         [...Array(index+1)].map(() => {
                                             return <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                         })
                                    }
                                     ({this.handleTotalProduct(index+1)})
                                </div>
                    })
                                                      

                  }
              
            
           </div>
        );
    }
}

Rating.propTypes = {
    idCategory:PropTypes.object,
    getProduct:PropTypes.func,
    getIDRating:PropTypes.func,
    type:PropTypes.array,
    brand:PropTypes.array,
};

export default Rating;