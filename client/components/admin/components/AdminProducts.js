import React, { Component } from 'react';
import {Icon, Image,Table, Button,Segment,Input} from 'semantic-ui-react';
import moment from 'moment'


class AdminProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: null,
			activeProduct: null
		};
		this.handleActiveEdit = this.handleActiveEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleActiveEdit(product,index){
		if(index == this.state.activeIndex){
			this.setState({
				activeIndex: null,
				activeProduct: null
			})
		}
		else {
			this.setState({
				activeIndex: index,
				activeProduct: product
			})
		}
	}
	handleSubmit(){

		const update = {
			name: this._name.inputRef.value,
			description: this._description.inputRef.value,
			price: +this._price.inputRef.value,
			inventoryQuantity: +this._inventoryQuantity.inputRef.value,
		}
		this.props.putProduct(this.state.activeProduct.id,update)
		this.setState({
			activeIndex: null,
			activeProduct: null
		})
	}
	render() {
		const {products,putProduct} = this.props
		return (
			<div style={{margin: '15px'}}>
				<Segment >
					<h3>Products</h3>
					<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell style={{width: '60px'}} textAlign="center">Image</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Category</Table.HeaderCell>
							<Table.HeaderCell style={{width: "400px"}} textAlign="center">Description</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Inventory</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Created</Table.HeaderCell>
							<Table.HeaderCell style={{width: "120px"}} textAlign="center">Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{products.map((product, index) => (
							<Table.Row key={product.id}>
								<Table.Cell style={{width: '60px'}} textAlign="center">
									<Image style={{width: "40px",height: "40px",margin: '10px'}} src={product.imgUrl}/>
								</Table.Cell>
								<Table.Cell textAlign="center">
									{this.state.activeIndex === index ? <Input ref={input => this._name = input} defaultValue={product.name}/> : product.name}
								</Table.Cell>
								<Table.Cell textAlign="center">
									{product.category.name}
								</Table.Cell>
								<Table.Cell style={{width: "400px"}} textAlign="center">
									{this.state.activeIndex === index ? <Input ref={input => this._description = input} defaultValue={product.description}/> : product.description}
								</Table.Cell>
								<Table.Cell textAlign="center">
									 $ {this.state.activeIndex === index ? <Input ref={input => this._price = input} defaultValue={product.price}/> : product.price/100}
								 </Table.Cell>
								<Table.Cell textAlign="center">
									{this.state.activeIndex === index ? <Input ref={input => this._inventoryQuantity = input} defaultValue={product.inventoryQuantity}/> : product.inventoryQuantity}
								</Table.Cell>
								<Table.Cell textAlign="center">{moment(product.createdAt).format('MMM YYYY')}</Table.Cell>
								<Table.Cell style={{width: "120px"}} textAlign="center">
									<Button onClick={()=>this.handleActiveEdit(product,index)} style={styles.button} icon color={'blue'}>
										<Icon name='edit' />
									</Button>
									<Button disabled={this.state.activeIndex !== index} style={styles.button} icon color={'green'} onClick={this.handleSubmit}>
										<Icon name='save' />
									</Button>
								</Table.Cell>
							</Table.Row>)
						)}
					</Table.Body>
					</Table>
				</Segment>
			</div>
		);
	}

}


const styles= {
	button: {
		marginRight: '5px'
	},
	orderSegment: {
		flex: 1,
		marginTop: "0px",
		marginLeft: '10px'
	}
}
export default AdminProducts;
