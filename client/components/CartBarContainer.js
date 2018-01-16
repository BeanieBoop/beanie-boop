import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

import store, {
  editLineItem,
  removeLineItem,
  clearLineItems,
  syncLocalStorage
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

    const { isLoggedIn, lineItems, handleSubmit } = this.props

    if (!this.state.clickedCheckoutButton) {
      return <Cart {...this.props} toggleCheckout={this.toggleCheckout} />
    } else {
      return (
        <div>
          <h1 style={orderSummary}>Order Summary</h1>
          {
            !isLoggedIn && <GuestInfoForm setEmail={this.setEmail}/>
          }
          <Button
            onClick = {() => {
              handleSubmit(lineItems, this.state.email)
              alert('Order submitted! An email confirmation will be sent to you shortly.')
              this.toggleCheckout()
            }}
            style={submitButton} type='submit'>Submit Order</Button>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    products: state.products.products,
    lineItems: state.lineItems,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
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
      console.log('handleSubmit')
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
    padding: '1em'
  },
  submitButton: {
    marginLeft: '1em'
  }
}

const { orderSummary, submitButton } = styles
