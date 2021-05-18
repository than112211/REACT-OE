import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Type extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            type:[],
        }
    }
    componentDidMount(){
        const {idCategory,idDetailCategory} = this.props.category
        const url = `http://localhost:3000/types?category_id=${idCategory}`;
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
            this.setState({type:data[0].type})
        })
        
        const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}`;
         
        fetch(url1,option)
        .then(response => response.json())
        .then(data => {  
            this.setState({
                product:data
            })     
        })
    }
    componentDidUpdate(prevProps, prevState){
        const {idCategory,idDetailCategory} = this.props.category
        const {ToTalProduct,type,pagination,CountProduct} = this.props
        if(prevProps.category.idCategory !== idCategory || prevProps.category.idDetailCategory !== idDetailCategory){
            const url = `http://localhost:3000/types?category_id=${idCategory}`;
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
                this.setState({type:data[0].type})     
            })
            const url1 = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ? `&detail_category=${idDetailCategory}`:``}`;
         
            fetch(url1,option)
            .then(response => response.json())
            .then(data => {  
                this.setState({
                    product:data
                })     
            })
            this.inputType = (element) =>{
               if(element){
                   if(element.checked== true){
                       element.checked=false
                   }
               }
            }  
        }
        if(prevState.type !== type || prevProps.pagination.page !== pagination.page){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ?`&detail_category=${idDetailCategory}`:``}${type ? this.handleTypeChecked(type) : ``}&_page=${pagination.page}&_limit=${pagination.limit}`;
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
    handleChangeCheckType(e,id){
        const {RemoveType,AddType,ClearBrand,SetFilter,ClearRating,ClearPrice,ResetPage} = this.props
        ClearRating()
        ClearBrand()
        ClearPrice()
        ResetPage()
        SetFilter()
        if(e.target.checked) {
            AddType(id)
            }
        else {
            RemoveType(id)
        }
    }
    handleTypeChecked(id){
        var str = ''
       id.map(check => {
            str += `&type=${check}`
        })
        return str
        
    }
    handleTotalProduct(id){
        let number = 0
        this.state.product.map(product =>{
            if(product.type == id) number+=1
        })
       return number
    }
 
    render() {
        const {type} = this.state
        return (
            <div className="filter type">
            <h1 className="title__filter">Type</h1>
           <ul>
                {type.map((type,index) =>{
                    return <div className="filter__item type__item" style={{display : this.handleTotalProduct(index+1) > 0  ? 'block' : 'none'}}>
                            <li > <input ref={this.inputType} onChange={ (event) => this.handleChangeCheckType(event,index+1)}   type="checkbox"></input>{type.name} 
                                ({this.handleTotalProduct(index+1)})
                            </li>
                        </div>
                   
                })}
           </ul>
        </div>
        );
    }
}

Type.propTypes = {
    category:PropTypes.object,
    type:PropTypes.array,
    AddType:PropTypes.func,
    RemoveType:PropTypes.func,
    ClearType:PropTypes.func,
    ToTalProduct:PropTypes.func,
};

export default Type;