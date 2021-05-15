import PropTypes from 'prop-types';
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../resourses/img/logo.webp'
import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            char:''
        }
    }
    handleChangeSearch(e){
        this.setState({
            char:e.target.value
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
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idBrand,idType,idRating,idPrice} = this.props
        const {char} = this.state
        if(prevState.char !== char){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}${this.handleTypeChecked(idType) ? this.handleTypeChecked(idType) : ``}${this.handleBrandChecked(idBrand) ? this.handleBrandChecked(idBrand) : ``}${idRating ? `&rating=${idRating}` :``}${idPrice[0] ? `&price_gte=${idPrice[0]}`: idPrice[1] ? `&price_lte=${idPrice[1]}` :``}&name_like=${char}`
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
                this.props.getSearch(char)
            })
        }
    }
    render() {
        
        return (
            <div>
                 <header className="header">
                <div className="container header__container">
                    <a href="" className="logo"><img src={logo} alt="" srcSet=""/></a>
                    <a href="" className="logoname">amazing</a>
                    <div className="search">
                        <input type="text" id="input__search" onChange={(event) => this.handleChangeSearch(event)}/>
                        <FontAwesomeIcon icon="search"></FontAwesomeIcon>
                    </div>
                </div>
            </header>
            </div>
        );
    }
}

Header.propTypes = {
    idCategory:PropTypes.object,
    getProduct:PropTypes.func,
    idType:PropTypes.array,
    idBrand:PropTypes.array,
    idPrice:PropTypes.array,
    idRating:PropTypes.number,
    getSearch:PropTypes.func,
};

export default Header;