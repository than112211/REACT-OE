import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Type extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            type:[],
            idTypeCheck:[]
        }
    }
    componentDidMount(){
        const {idCategory,idDetailCategory} = this.props.idCategory
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
        const {idCategory,idDetailCategory} = this.props.idCategory
        const {idTypeCheck,product} = this.state
        if(prevProps.idCategory.idCategory !== idCategory || prevProps.idCategory.idDetailCategory !== idDetailCategory){
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

        if(prevState.idTypeCheck !== idTypeCheck){
            const url = `http://localhost:3000/products?category=${idCategory}${idDetailCategory ?`&detail_category=${idDetailCategory}`:``}${idTypeCheck ? this.handleTypeChecked(idTypeCheck) : ``}`;
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
                this.props.getIDType(idTypeCheck)
                this.props.getProduct(data)
            })
        }

      
    }
  
    handleChangeCheckType(e,id){
        const {idTypeCheck} = this.state
        if(e.target.checked) {
            this.setState({
                //update state
                //ES6 tương tự .push array
              idTypeCheck : [...idTypeCheck,id]
            })

        }
        else {
            let newid = [...idTypeCheck]
            newid.splice(idTypeCheck.indexOf(id),1)
            this.setState({
                idTypeCheck:newid
            })
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
                            <li > <input onChange={ (event) => this.handleChangeCheckType(event,index+1)}  type="checkbox"></input>{type.name} 
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
    idCategory:PropTypes.object,
    getProduct:PropTypes.func,
    getIDType:PropTypes.func,
};

export default Type;