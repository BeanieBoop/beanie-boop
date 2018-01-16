import React from 'react'
import MdClose from 'react-icons/lib/md/close'
import GoDiffAdded from 'react-icons/lib/go/diff-added'
import GoDiffRemoved from 'react-icons/lib/go/diff-removed'
import { Header, Image, Table } from 'semantic-ui-react'


const Cart = props => {

  const { lineItems, products, handleEditQuantity, handleRemove, isLoggedIn, toggleCheckout } = props

  console.log('isLoggedIn?', isLoggedIn)

  const convertPrice = price => '$' + (price / 100).toFixed(2)
  const computeSubtotal = lineItems => {
    let subtotal = 0;
    lineItems.forEach(lineItem => {
      const { unitPrice, quantity } = lineItem
      const lineItemCost = unitPrice * quantity
      subtotal += lineItemCost
    })
    return convertPrice(subtotal)
  }

  return products.length ?
  (
    <div style={cartContainer}>
      <Table compact celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Remove Item</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

        {
          lineItems.map(lineItem => {

            const { unitPrice, quantity, productId } = lineItem
            const productInfo = products.find(product => product.id === productId)
            const { name, imgUrl } = productInfo

            return (
              <Table.Row key={productId}>

                <Table.Cell>
                  <Header as='h4' image>
                    <Image src={imgUrl} size='mini' />
                    <Header.Content>
                      {name}
                    </Header.Content>
                  </Header>
                </Table.Cell>

                <Table.Cell>
                  {convertPrice(unitPrice)}
                </Table.Cell>

                <Table.Cell>
                  <div style={quantityContainer}>
                    <div style={quantityDiv}>
                      <GoDiffRemoved
                        onClick={() => handleEditQuantity(productId, quantity - 1)}
                        size={20} color={'#ccc'} />
                    <div>{quantity}</div>
                      <GoDiffAdded
                        onClick={() => handleEditQuantity(productId, quantity + 1)}
                        size={20} color={'#ccc'} />
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <MdClose
                    onClick={() => handleRemove(productId)} size={24} color={'#ccc'} />
                </Table.Cell>

              </Table.Row>
            )
          })
        }
        </Table.Body>
      </Table>
      <div style={subtotalContainer}>
        <p>Subtotal</p>
        <p>{computeSubtotal(lineItems)}</p>
      </div>
      <div style={checkoutButtonContainer}>
        <button
          onClick={() => toggleCheckout()} className="positive ui button">Checkout</button>
      </div>
    </div>
  )
  : <h1>Loading...</h1>
}

export default Cart


// ----------CSS----------

const styles = {
	cartContainer: {
    background: 'white',
    padding: '1em'
  },
  deleteButtonContainer: {
    height: '120px',
    width: '160px',
    padding: '50px',
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
    padding: '1em'
  },
  subtotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em'
  }
}
const {
  cartContainer,
  quantityContainer,
  quantityDiv,
  checkoutButtonContainer,
  subtotalContainer
} = styles
