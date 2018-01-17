import React, { Component } from 'react';
import moment from 'moment';
import {Icon, Table, Button,Segment} from 'semantic-ui-react';
import OrderHistory from './OrderHistory';

const outstandingOrders = (orders) => {
	const orderLength = orders.filter(order => {
		return order.status === "in-progress"
	}).length
	return orderLength == 0 ? orderLength : <Icon name="user"/>
}


class AdminUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeUser: null
		};
		this.changeUser = this.changeUser.bind(this)
	}
	changeUser(data){
		this.setState({activeUser: data})
	}
	render() {
		const {users,makeAdmin} = this.props
		return (
			<div style={{display: 'flex', margin: '15px'}}>
				<Segment>
					<h3>Users</h3>
					<Table celled striped>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Date Added</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Total Orders</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Orders in Process</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
						{users.map(user => (
							<Table.Row key={user.id}>
				        <Table.Cell collapsing>
				          {user.isAdmin ? <Icon circular inverted color='teal' name='privacy' /> : <Icon circular color="grey" name='user' />} {user.name}
				        </Table.Cell>
				        <Table.Cell textAlign="center">{user.email}</Table.Cell>
				        <Table.Cell textAlign="center">{moment(user.createdAt).format("DD MMM YYYY")}</Table.Cell>
								<Table.Cell textAlign="center">{user.orders.length}</Table.Cell>
								<Table.Cell textAlign="center">{outstandingOrders(user.orders)}</Table.Cell>
								<Table.Cell textAlign="center">
									<Button onClick={()=>this.changeUser(user)} style={styles.button} icon color="blue">
							      <Icon name='magnify' />
							    </Button>
									<Button onClick={()=>makeAdmin(user.id)} style={styles.button} icon color={user.isAdmin ? 'grey' : 'green'}>
							      <Icon name={user.isAdmin ? 'arrow down': 'arrow up'} />
							    </Button>
									<Button style={styles.button} icon color="orange" >
							      <Icon name='refresh' />
							    </Button>
									<Button style={styles.button} icon color="red" >
							      <Icon name='trash' />
							    </Button>
								</Table.Cell>
			      	</Table.Row>)
						)}


			    </Table.Body>
			  </Table>
			</Segment>
			<Segment style={styles.orderSegment}>
				<h3>Order History: <span style={{color: "rgb(255, 77, 77)"}}>{this.state.activeUser && this.state.activeUser.name}</span></h3>
				<OrderHistory user={this.state.activeUser}/>
			</Segment>
			</div>
			);
		}

	}


const styles= {
	button: {
		marginRight: '15px'
	},
	orderSegment: {
		flex: 1,
		marginTop: "0px",
		marginLeft: '10px'
	}
}
export default AdminUsers;
