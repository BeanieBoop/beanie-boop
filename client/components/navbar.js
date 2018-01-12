import React from 'react';
import {MdPerson} from 'react-icons/lib/md';
import {MdShoppingCart} from 'react-icons/lib/md';
import { Input } from 'semantic-ui-react'

const NavBar = ({loggedIn}) => (
	<div style={container}>
		<img style={logo} src="ty-logo.png"></img>
		<div style={searchBar}>
			<Input
				fluid
    	icon={{ name: 'search', circular: true, link: true }}
    	placeholder='Search...'
  	/>
		</div>
		<div style={cartContainer}>
			<MdShoppingCart size={30} style={cartIcon}/>
		</div>
		{loggedIn ? <MdPerson size={30} style={profileIcon}/> : <p>login/sign up</p>}
	</div>
);

const styles={
	container: {
		height: "50px",
		display: 'flex',
		alignItems: 'center',
		borderBottom: "1px solid #ccc"
	},
	cartContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	cartIcon: {
		color: '#ccc',
		marginLeft: "10px"
	},
	profileIcon: {
		color: '#ccc',
		marginLeft: "30px",
		marginRight: "30px",
	},
	logo: {
		marginLeft: "30px",
		marginRight: "30px",
		height: "30px"
	},
	searchBar:{
		paddingRight: '100px',
		paddingLeft: '100px',
		flex: 1,
		justifyContent: 'center'
	}
}
const {container, logo, profileIcon, searchBar, cartContainer, cartIcon} = styles
export default NavBar;
