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
    componentDidUpdate(prevProps, prevState){
        const {char} = this.state
        if(prevState.char !== char)
                this.props.getSearch(char)
        
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