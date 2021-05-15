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
            idRating:null,
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
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idBrand,idType} = this.props

        const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}`;
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
        const {idBrand,idType} = this.props
        const {idRating} = this.state
        if(prevProps.idCategory.idCategory !== idCategory || prevProps.idCategory.idDetailCategory !== idDetailCategory || prevProps.idType !== this.props.idType || prevProps.idBrand !== this.props.idBrand){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}`;
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

        if(prevState.idRating !== idRating){
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
                this.props.getIDRating(idRating)
                this.props.getProduct(data)
            })
        }
    }
    handleClickRating(id) {
        this.setState({
            idRating:id
        })
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
    idType:PropTypes.array,
    idBrand:PropTypes.array,
};

export default Rating;