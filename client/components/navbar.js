import React, { Component } from 'react';
//import {MdPerson} from 'react-icons/lib/md';
import {TiShoppingCart,TiUserOutline} from 'react-icons/lib/ti';
import { Input, Icon, Modal, Header, Dropdown} from 'semantic-ui-react'

import {Login} from './index'

const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
]
const trigger = (
  <span>
    <TiUserOutline size={30} style={{
			color: "rgba(0,0,0,.4)",
			marginLeft: "30px",
			marginRight: "-10px",
		}}/>
  </span>
)

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			dropdown: false
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
				{loggedIn ? (
					<div style={{marginRight: "30px"}}>
						<Dropdown className="profileDropdown left" floating trigger={trigger}>
							<Dropdown.Menu>
								<Dropdown.Item onClick={()=>logout()}>
									<Icon name='log out' className='left floated' />
        					Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)
				: <p style={styles.loginText} onClick={()=>{this.setState({modalOpen: true})}}>Login / Sign Up</p>}
				<Modal size="small" open={this.state.modalOpen} onClose={()=>this.setState({modalOpen: false})}>
			    <Modal.Header>Log In</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
							<Login closeModal={()=>this.setState({modalOpen: false})} />
			      </Modal.Description>
			    </Modal.Content>
			  </Modal>
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
//<TiUserOutline onClick={()=>logout()} size={30} style={profileIcon}/>
const {container, logo, profileIcon, searchBar, cartContainer, cartIcon} = styles
export default NavBar;
