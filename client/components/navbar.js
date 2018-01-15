import React, { Component } from 'react';
//import {MdPerson} from 'react-icons/lib/md';
import {TiShoppingCart,TiUserOutline} from 'react-icons/lib/ti';
import { Input, Modal, Header} from 'semantic-ui-react'


class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}
	render() {
		const {loggedIn,logout, changeSearch} = this.props
		return (
			<div style={container}>
				<img style={logo} src="ty-logo.png"></img>
				<div style={searchBar}>
					<Input
					fluid
					input={{style:{border: '2px solid #ccc'}}}
		    	icon={{ name: 'search', link: true, style: {color: "#ccc",fontSize: '20px' }}}
		    	placeholder='Search...'
					onChange={(event, data)=> {
						changeSearch(data.value)
					}}
		  	/>
				</div>
				<div style={cartContainer}>
					<TiShoppingCart size={30} style={cartIcon}/>
				</div>
				{loggedIn ? <TiUserOutline onClick={()=>logout()} size={30} style={profileIcon}/> : <p style={styles.loginText} onClick={()=>{this.setState({modalOpen: true})}}>Login / Sign Up</p>}
				{/* <Modal open={this.state.modalOpen} onClose={()=>this.setState({modalOpen: false})}>
			    <Modal.Header>Select a Photo</Modal.Header>
			    <Modal.Content image>
			      <Modal.Description>
			        <Header>Default Profile Image</Header>
			        <p>We've found the following gravatar image associated with your e-mail address.</p>
			        <p>Is it okay to use this photo?</p>
			      </Modal.Description>
			    </Modal.Content>
			  </Modal> */}
			</div>
		);
	}

}

const styles = {
	container: {
		background: 'white',
		height: "55px",
		display: 'flex',
		alignItems: 'center',
		borderBottom: "2px solid #ccc"
	},
	cartContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	loginText: {
		color: "rgba(0,0,0,.4)",
		fontSize: '16px',
		marginLeft: "10px",
		marginRight: "10px",
	},
	cartIcon: {
		color: "rgba(0,0,0,.4)",
		marginLeft: "10px"
	},
	profileIcon: {
		color: "rgba(0,0,0,.4)",
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
