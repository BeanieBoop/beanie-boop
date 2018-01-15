import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {changeCategory,changeOrder} from '../../store/products'

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
function filterProducts(products, category,search){
  if(category === 'All') return searchProducts(search, products);
	return searchProducts(search ,products.filter(product => product.category.name === category))
}

function mapState(state,props){
  return {
    products: orderProducts(filterProducts(state.products.products, state.products.category,state.products.search),state.products.order),
		category: state.products.category,
		categories: state.categories
  }
}

function mapDispatch(dispatch){
  return bindActionCreators({changeCategory,changeOrder},dispatch)
}

export default connect(mapState,mapDispatch)(Products)
