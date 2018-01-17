import React from 'react';
import {withRouter,NavLink} from 'react-router-dom'
import {Icon,Input,Dropdown} from 'semantic-ui-react';

const AdminNav = ({categories,match}) => (
	<div style={container}>
		<div style={categoryContainer}>
			<NavLink to='/admin/users' style={catTab} activeStyle={activeTab} >Users</NavLink>
			<NavLink to='/admin/products' style={catTab} activeStyle={activeTab} >Products</NavLink>
			<NavLink to='/admin/orders' style={catTab} activeStyle={activeTab} >Orders</NavLink>
		</div>
	</div>
);

const styles={
	container: {
		height: "50px",
		display: 'flex',
		justifyContent: "space-between",
		alignItems: 'center',
		paddingLeft: "30px",
		background: 'white',
		boxShadow: "0 0 6px -3px rgba(0, 0, 0, 1)"
	},
	categoryContainer: {
		display: 'flex',
	},
	activeTab:{
		color: '#ff4d4d',
		fontSize: '16px',
		marginLeft: "10px",
		marginRight: "10px",
		width: "120px",
		textAlign: 'center',
		paddingBottom: "10px",
		marginTop: '15px',
		borderBottom: '4px solid #ff4d4d'
	},
	catTab: {
		fontSize: '16px',
		color: "rgba(0,0,0,.4)",
		marginLeft: "10px",
		marginRight: "10px",
		width: "120px",
		textAlign: 'center',
		paddingBottom: "10px",
		marginTop: '15px',
		borderBottom: '4px solid white'
	},
	sort: {
		marginRight: "30px"
	},
	sortText: {
		marginRight: "30px",
		fontSize: '16px',
		color: "rgba(0,0,0,.4)"
	}

}

const {container,catTab,activeTab, categoryContainer,sort, sortText} = styles

export default withRouter(AdminNav);
