import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas, faStar} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';
import './index.scss'
library.add(fas,faStar)

class Product extends Component {
    render() {
        const {product} = this.props
        return (
            <div className="row">
            {product ? 
            product.map(product =>{
              return <div className="col-4 col-sm-4">
                            <div className="card__container">
                                <div className="card__img">
                                    <img src={`http://localhost:8080/img/${product.img}`} alt="Product image" srcset=""/>
                                </div>
                                <div className="card__content">
                                    <h1>{product.name}</h1>
                                    <h3>{product.price}$</h3>
                                    <div className="rating__product">
                                         {[...Array(product.rating)].map(() =>{
                                             return   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                         })}
                                    </div>
                                    <div className="btn__buy">
                                    <Button color="primary">Buy</Button>{' '}
                                    </div>
                                </div>
                            </div>
                     </div>
              
            }) : <></>}
            </div>
        );
    }
}

Product.propTypes = {
    product:PropTypes.array,
};

export default Product;