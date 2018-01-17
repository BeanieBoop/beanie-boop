import React, { Component } from 'react';
import {Icon, Table, Button,Segment,Accordion,Image,List} from 'semantic-ui-react';
import moment from 'moment'

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

		          {order.lineitems.map(lineItem => {
								return (
									<div key={lineItem.id}>
										<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
											<div style={{display: 'flex', alignItems: 'center'}}>
												<Image style={{width: "40px",height: "40px",margin: '10px'}} src={lineItem.product.imgUrl}/>
													<div style={{marginLeft: "5px"}}>
														<h5 >{lineItem.product.name}</h5>
													</div>
											</div>

											<div style={{display: 'flex',width: "100px", justifyContent: 'flex-end'}}>
												<div style={{width: "20px"}}>{lineItem.quantity}</div>
												<div style={{width: "20px"}}>@</div>
												<div style={{width: "60px"}}>{`$ ${lineItem.unitPrice/100}`}</div>
											</div>
										</div>
										<hr/>
							    </div>
								)
							})}
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div>
									<h3> Total: </h3>
								</div>
								<div>
									<h3 style={{color: "rgb(255, 77, 77)"}}>$ {order.lineitems.reduce((total, lineitem)=> total + (lineitem.quantity * (lineitem.unitPrice/100)),0)} </h3>
								</div>
							</div>


		        </Accordion.Content>
					</div>
				})}

      </Accordion>
		);
	}

}

export default OrderHistory;
