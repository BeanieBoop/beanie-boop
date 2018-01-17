import React, { Component } from 'react';
import {Icon, Image,Table, Button,Segment,Input,Popup} from 'semantic-ui-react';
import moment from 'moment'
import OrderStatus from './OrderStatus'

import ProductPreview from './ProductPreview'


class AdminOrders extends Component {
	render() {
		const {products,orders} = this.props
		return (
			<div style={{display: 'flex', margin: '15px'}}>
				<Segment >
					<h3>Orders</h3>
					<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell style={{width: '60px'}} textAlign="center">Order</Table.HeaderCell>
							<Table.HeaderCell style={{width: '60px'}} textAlign="center">Date Placed</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{orders.map((order, index) => (
							<Table.Row key={order.id}>
								<Table.Cell style={{width: "50px"}} textAlign="center">
									<Popup trigger={<Button icon='info' />}>

										<Popup.Content>
      								<ProductPreview order={order} />
    								</Popup.Content>
								  </Popup>
								</Table.Cell>
								<Table.Cell style={{width: "220px"}} textAlign="center">
									{moment(order.createdAt).format('llll')}
								</Table.Cell>
								<Table.Cell style={{width: "200px"}} textAlign="left">
									{order.user ? order.user.name : "Visitor"}
								</Table.Cell>
								<Table.Cell textAlign="center">
									<OrderStatus putOrder={this.props.putOrder} order={order}/>
								</Table.Cell>
							</Table.Row>)
						)}
					</Table.Body>
					</Table>
				</Segment>
				<Segment style={styles.filterSegment}>
					<h3>Filters</h3>
				</Segment>
			</div>
		);
	}

}


const styles= {
	button: {
		marginRight: '5px'
	},
	filterSegment: {
		flex: 1,
		marginTop: "0px",
		marginLeft: '10px'
	}
}
export default AdminOrders;
