import PropTypes from 'prop-types';
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../resourses/img/logo.webp'
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                 <header className="header">
                <div className="container header__container">
                    <a href="" className="logo"><img src={logo} alt="" srcSet=""/></a>
                    <a href="" className="logoname">amazing</a>
                    <div className="search">
                        <input type="text" id="input__search" />
                        <FontAwesomeIcon icon="search"></FontAwesomeIcon>
                    </div>
                </div>
            </header>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;