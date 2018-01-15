import React from 'react'
import { connect } from 'react-redux'
import MdClose from 'react-icons/lib/md/close'
import GoDiffAdded from 'react-icons/lib/go/diff-added'
import GoDiffRemoved from 'react-icons/lib/go/diff-removed'
import { addLineItemLS, editLineItemLS, removeLineItemThunk, postOrder } from '../store'
// import { withRouter } from 'react-router-dom'
// import { currentId } from 'async_hooks';

import store from '../store' //TEMPORARY FOR DUMMY DATA


const Cart = props => {

  const { lineItems, products, handleSubmit, handleDelete } = props

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
                <MdClose onClick={() => handleDelete(productId)} size={24} color={'#ccc'} />
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
                  <GoDiffRemoved size={20} color={'#ccc'} />
                  <div>{quantity}</div>
                  <GoDiffAdded size={20} color={'#ccc'} />
                </div>
              </td>
            </tr>
          )
          })
        }
        </thead>
      </table>
      <div style={checkoutButtonContainer}>
        <button onClick={handleSubmit} className="positive ui button">Checkout</button>
      </div>
    </div>

  )
  : <h1>Loading...</h1>
}

const mapState = state => {
  return {
    products: state.products,
    lineItems: state.lineItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleDelete: (productId) => {
      dispatch(removeLineItemThunk(productId))
    }
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
dummyLineItems.map(lineItem => store.dispatch(addLineItemLS(lineItem)) ) // add dummy data to state

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
  },
	cartTable: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '0 0 6px 6px',
    border: '2px solid #ccc',
  },
  lineItemContainer: {
    borderTop: '2px solid #ccc'
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
