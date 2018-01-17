import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {changeCategory,changeOrder} from '../../store/products'
import { addLineItem, editLineItem } from '../../store'

import ProductsWrapper from './components/ProductsWrapper'

const Products = (props) => {
	return <ProductsWrapper {...props}/>
}

function searchProducts(search, products){
	const regex = new RegExp(search, 'i');
	return products.filter(product => product.name.match(regex))
}
function orderProducts(products, order){
	if(order === 'descName'){
		return products.sort((a, b) => {
			if(a.name < b.name) return 1;
	    if(a.name > b.name) return -1;
	    return 0;
		})
	}
	else if (order === 'ascPrice'){
		return products.sort((a, b) => {
			if(a.price < b.price) return -1;
	    if(a.price > b.price) return 1;
	    return 0;
		})
	}
	else if (order === 'descPrice'){
		return products.sort((a, b) => {
			if(a.price < b.price) return 1;
	    if(a.price > b.price) return -1;
	    return 0;
		})
	}
	else if (order === 'ascDate'){
		return products.sort((a, b) => {
			if(a.createdAt < b.createdAt) return -1;
	    if(a.createdAt > b.createdAt) return 1;
	    return 0;
		})
	}
	else if (order === 'descDate'){
		return products.sort((a, b) => {
			if(a.createdAt < b.createdAt) return 1;
	    if(a.createdAt > b.createdAt) return -1;
	    return 0;
		})
	}
	else {
		return products.sort((a, b) => {
			if(a.name < b.name) return -1;
	    if(a.name > b.name) return 1;
	    return 0;
		})
	}
}
function filterProducts(products, category,search,props){
	const {catId} = props.match.params
  if(!catId) return searchProducts(search, products);
	return searchProducts(search ,products.filter(product => product.category.id === +catId))
}

function mapState(state,props){
  return {
    products: orderProducts(filterProducts(state.products.products, state.products.category,state.products.search,props),state.products.order),
		category: state.products.category,
    categories: state.categories,
    lineItems: state.lineItems
  }
}

function mapDispatch(dispatch){
  return bindActionCreators({changeCategory,changeOrder, addLineItem, editLineItem},dispatch)
}

export default connect(mapState,mapDispatch)(Products)
