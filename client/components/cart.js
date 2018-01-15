import React from 'react'
import { connect } from 'react-redux'
import MdClose from 'react-icons/lib/md/close'
import GoDiffAdded from 'react-icons/lib/go/diff-added'
import GoDiffRemoved from 'react-icons/lib/go/diff-removed'
import axios from 'axios'

import store, {
  addLineItem,
  editLineItem,
  removeLineItem,
  clearLineItems,
  syncLocalStorage,
  postLineItem } from '../store'

const Cart = props => {

  const { lineItems, products, handleEditQuantity, handleRemove } = props

  return products.length ?
  (
    <div style={cartContainer}>
      <div style={header}>Shopping Cart</div>
      <table style={cartTable}>
        <thead>
        {
          lineItems.map(lineItem => {

          const { unitPrice, quantity, productId } = lineItem
          const productInfo = products.find(product => product.id === productId)
          const { name, imgUrl } = productInfo
          const convertPrice = price => (price / 100).toFixed(2)

          return (
            <tr key={productId} style={lineItemContainer}>
              <td style={deleteButtonContainer}>
                <MdClose onClick={() => handleRemove(productId)} size={24} color={'#ccc'} />
              </td>
              <td style={pictureContainer}>
                <img src={`${imgUrl}`} />
              </td>
              <td style={nameContainer}>
                <h3>{name}</h3>
              </td>
              <td style={priceContainer}>
                <h4>${convertPrice(unitPrice)}</h4>
              </td>
              <td style={quantityContainer}>
                <div style={quantityDiv}>
                  <GoDiffRemoved
                    onClick={() => handleEditQuantity(productId, quantity - 1)}
                    size={20} color={'#ccc'} />
                <div>{quantity}</div>
                  <GoDiffAdded
                    onClick={() => handleEditQuantity(productId, quantity + 1)}
                    size={20} color={'#ccc'} />
                </div>
              </td>
            </tr>
          )
          })
        }
        </thead>
      </table>
      <div style={checkoutButtonContainer}>
        <button className="positive ui button">Checkout</button>
      </div>
    </div>

  )
  : <h1>Loading...</h1>
}

const mapState = state => {
  return {
    products: state.products.products,
    lineItems: state.lineItems
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
    // handleSubmit: (lineItems) => {
    //   axios.post('/api/orders', { status: 'in-process' })
    //     .then(res => res.data)
    //     .then(order => {
    //       dispatch(createOrder(order));
    //       lineItems.map(lineItem => {
    //         postLineItem(lineItem)
    //       })
    //     })
    //     .catch(err => console.log(err))
    // }
  }
}

export default connect(mapState, mapDispatch)(Cart)

// ---------- DUMMY DATA ----------

const dummyLineItems = [
  {
    unitPrice: 5999,
    quantity: 1,
    productId: 2
  },
  {
    unitPrice: 1990,
    quantity: 2,
    productId: 5
  }
]

localStorage.setItem('lineItems', JSON.stringify(dummyLineItems)) // set dummy data to localStorage
dummyLineItems.map(lineItem => store.dispatch(addLineItem(lineItem)) ) // add dummy data to state

// ----------CSS----------

const styles = {
	cartContainer: {
		display: 'flex',
    margin: '5em 10em',
    flexDirection: 'column',
    flex: '1',
  },
  header: {
    padding: '1.3em',
    fontSize: '24px',
    borderRadius: '6px 6px 0 0',
    borderLeft: '2px solid #ccc',
    borderRight: '2px solid #ccc',
    borderTop: '2px solid #ccc',
    background: 'white'
  },
	cartTable: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '0 0 6px 6px',
    border: '2px solid #ccc',
  },
  lineItemContainer: {
    borderTop: '2px solid #ccc',
    background: 'white'
  },
  deleteButtonContainer: {
    height: '120px',
    width: '160px',
    padding: '50px',
    textAlign: 'center',
  },
  pictureContainer: {
    textAlign: 'center',
  },
  nameContainer: {
    textAlign: 'center',
  },
  priceContainer: {
    width: '160px',
    textAlign: 'center',
  },
  quantityContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '60px 0',
  },
  quantityDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '1em',
    fontWeight: 'bold',
    width: '80px'
  },
  checkoutButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '2em'
  }
}
const {
  cartContainer,
  header,
  cartTable,
  lineItemContainer,
  deleteButtonContainer, pictureContainer, nameContainer, priceContainer, quantityContainer, quantityDiv,
  checkoutButtonContainer } = styles
