import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Button ,Segment} from 'semantic-ui-react'
import ProductPreview from './admin/components/ProductPreview'

import store, {
  editLineItem,
  removeLineItem,
  clearLineItems,
  syncLocalStorage,
  fetchOrders
} from '../store'

import Cart from './Cart'
import GuestInfoForm from './GuestInfoForm'

class CartBarWrapper extends Component {

  constructor () {
    super()
    this.state = {
      clickedCheckoutButton: false,
      email: ''
    }
    this.toggleCheckout = this.toggleCheckout.bind(this)
    this.setEmail = this.setEmail.bind(this)
  }

  toggleCheckout () {
    this.setState({
      clickedCheckoutButton: !this.state.clickedCheckoutButton
    })
    console.log('toggleCheckout', this.state.clickedCheckoutButton)
  }

  setEmail (email) {
    this.setState({
      email
    })
  }

  render () {

    const { isLoggedIn, lineItems, handleSubmit, order, handleNewFetch} = this.props
    if (!this.state.clickedCheckoutButton) {
      return <Cart {...this.props} toggleCheckout={this.toggleCheckout} />
    } else {
      return (
        <div>
          <h3 style={orderSummary}>Order Summary</h3>
          <Segment style={{margin: '15px'}}>
            <ProductPreview order={order}/>
          </Segment>

          {
            !isLoggedIn && <GuestInfoForm setEmail={this.setEmail}/>
          }
          <Button
            onClick = {() => {
              handleSubmit(lineItems, this.state.email)
              alert('Order submitted! An email confirmation will be sent to you shortly.')
              handleNewFetch()
              this.toggleCheckout()
            }}
            style={submitButton} floated='right' color='green' type='submit'>Submit Order</Button>
        </div>
      )
    }
  }
}
function getOrder(lineItems,products){
  const order = {
    lineitems:[]
  }
  lineItems.forEach((lineitem)=>{
    const product = products.find(product => lineitem.productId === product.id)
    lineitem.product = product
    order.lineitems.push(lineitem)
  })
  return order
}
const mapState = state => {
  return {
    order: getOrder(state.lineItems, state.products.products),
    products: state.products.products,
    lineItems: state.lineItems,
    isLoggedIn: !!state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleNewFetch: () => {
        return dispatch(fetchOrders())
    },
    handleEditQuantity: (productId, newQuantity) => {
      if (newQuantity >= 0) {
        dispatch(editLineItem(productId, newQuantity))
        const state = store.getState()
        syncLocalStorage(state)
      }
    },
    handleRemove: productId => {
      if (confirm(`Click OK to remove item(s) from cart`)) {
        dispatch(removeLineItem(productId))
        const state = store.getState()
        syncLocalStorage(state)
      }
    },
    handleSubmit: (lineItems, email) => {
      axios.post('/api/orders', { status: 'in-process', lineItems, email })
        .then(() => {
          dispatch(clearLineItems())
          const state = store.getState()
          syncLocalStorage(state)
        })
        .catch(err => console.log(err))
    }
  }
}

export default connect(mapState, mapDispatch)(CartBarWrapper)

const styles = {
  orderSummary: {
    marginLeft: '15px',
    color: "#ff4d4d"
  },
  submitButton: {
    marginRight: '15px'
  }
}

const { orderSummary, submitButton } = styles
