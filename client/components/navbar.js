import React from 'react';
//import {MdPerson} from 'react-icons/lib/md';
import {TiShoppingCart,TiUserOutline} from 'react-icons/lib/ti';
import { Input } from 'semantic-ui-react'

const NavBar = ({loggedIn}) => (
	<div style={container}>
		<img style={logo} src="ty-logo.png"></img>
		<div style={searchBar}>
			<Input
				fluid
			input={{style:{border: '2px solid #ccc'}}}
    	icon={{ name: 'search', link: true, style: {color: "#ccc",fontSize: '20px' }}}
    	placeholder='Search...'
  	/>
		</div>
		<div style={cartContainer}>
			<TiShoppingCart size={30} style={cartIcon}/>
		</div>
		{loggedIn ? <TiUserOutline size={30} style={profileIcon}/> : <p>login/sign up</p>}
	</div>
);

const styles={
	container: {
		height: "55px",
		display: 'flex',
		alignItems: 'center',
		borderBottom: "2px solid #ccc"
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
		height: "40px"
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
