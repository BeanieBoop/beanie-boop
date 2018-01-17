import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/orders'
import {fetchUsers,makeAdminThunk} from '../../store/user'
import {putProduct} from '../../store/products'


import AdminWrapper from './components/AdminWrapper'

class AdminContainer extends Component {
	componentDidMount(){
		this.props.fetchOrders()
		this.props.fetchUsers()
	}
	render() {
		return (
			<AdminWrapper {...this.props}/>
		);
	}
}



function mapState(state,props){
  return {
		categories: state.categories,
		products: state.products.products,
		orders: state.orders,
		users: state.user.users
  }
}

function mapDispatch(dispatch){
  return bindActionCreators({fetchOrders,fetchUsers,makeAdminThunk,putProduct},dispatch)
}

export default connect(mapState,mapDispatch)(AdminContainer)
