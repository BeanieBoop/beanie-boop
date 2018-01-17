import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const OrderStatus = ({order,putOrder}) => (
  <Step.Group>
		{console.log(order)}
		<Step disabled={order.status === 'closed' || order.status === 'delivery'} active={order.status === 'in-process'}>
      <Icon style={{color: order.status === 'in-process' ? "#21ba45" : "rgba(40,40,40,.3)"}} name='payment' />
      <Step.Content>
        <Step.Title>Billing Department</Step.Title>
      </Step.Content>
    </Step>
    <Step onClick={()=>{putOrder(order.id, {status: 'delivery'})}} disabled={order.status === 'closed'} active={order.status === 'delivery'}>
      <Icon style={{color: order.status === 'delivery' ? "#21ba45" : order.status === 'in-process' ? "black" : "rgba(40,40,40,.3)"}} name='truck' />
      <Step.Content>
        <Step.Title>Shipping</Step.Title>
      </Step.Content>
    </Step>

    <Step onClick={()=>{putOrder(order.id, {status: 'closed'})}} disabled={order.status === 'closed'}>
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Order Complete</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
)

export default OrderStatus
