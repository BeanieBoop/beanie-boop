import React, { Component } from 'react';
import {Icon, Table, Button,Segment,Accordion,Image,List} from 'semantic-ui-react';
import moment from 'moment'
import ProductPreview from './ProductPreview'

class OrderHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: null
		};
		this.handleClick =this.handleClick.bind(this)
	}
	handleClick(e, titleProps){
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
	render() {
		const { user } = this.props
		if(!user) return <p>No user selcted</p>
		const { activeIndex } = this.state
		return (
			<Accordion fluid styled>
				{user.orders.map((order,index)=>{
					return <div key={order.id}>
		        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
		          <Icon name='dropdown' />
		          {moment(order.createdAt).format('llll')}
		        </Accordion.Title>
		        <Accordion.Content active={activeIndex === index}>
		          <ProductPreview order={order}/>
		        </Accordion.Content>
					</div>
				})}

      </Accordion>
		);
	}

}

export default OrderHistory;
