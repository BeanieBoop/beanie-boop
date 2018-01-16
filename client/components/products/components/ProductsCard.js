import React from 'react';
import moment from 'moment';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import { TiPen, TiCalendarOutline, TiChartBarOutline } from 'react-icons/lib/ti';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import store, { syncLocalStorage } from '../../../store'

function reviewAverage(reviewArray) {
  const reviewLength = reviewArray.length;
  if (reviewLength === 0) return 0;
  const total = reviewArray.reduce((total, review) => review.rating + total, 0);
  return total / reviewLength;
}

const ProductsCard = ({ product, lineItems, addLineItem, editLineItem }) => (
  <Card style={styles.card}>
    <Link to={`products/${product.id}`}>
      <Image style={styles.image} src={product.imgUrl} />
    </Link>
    <Card.Content>
      <Card.Header>{product.name}</Card.Header>

      <Link to={`/products/${product.id}`}>
        <Card.Meta>
          <div style={styles.rating}>
            <TiCalendarOutline style={{ marginRight: '10px' }} size={20} />
            {moment(product.createdAt).format('MMM YYYY')}
          </div>
          <div style={styles.rating}>
            <div>
              <TiChartBarOutline style={{ marginRight: '10px' }} size={20} />
            </div>
            <div>
              <ReactStars
                style={{ marginTop: '30px' }}
                char="♥"
                count={5}
                edit={false}
                half={true}
                value={parseFloat(reviewAverage(product.reviews))}
                size={14}
                color1="#ccc"
                color2={'#ff4d4d'}
              />
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <TiPen style={{ marginRight: '10px' }} size={20} />
            {product.reviews.length === 1 ? `${product.reviews.length} review` : `${product.reviews.length} reviews`}
          </div>
        </Card.Meta>
      </Link>
    </Card.Content>

    <Card.Content style={styles.footer} extra>
      <div>
        <Icon style={{ fontSize: '16px' }} name="dollar" />
        {(product.price / 100).toFixed(2)}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => {
            const productExistsInCart = lineItems.find(lineItem => lineItem.productId === product.id)
            if (productExistsInCart) {
              const currentQuantity = productExistsInCart.quantity
              const newQuantity = currentQuantity + 1
              editLineItem(product.id, newQuantity)
              alert(`You already have ${currentQuantity} ${product.name} in your cart. You now have ${newQuantity} in your cart.`)
            } else {
              addLineItem({productId: product.id, unitPrice: product.price, quantity: 1})
              alert(`Added 1 ${product.name} to your cart`)
            }
            const state = store.getState()
            syncLocalStorage(state)
          }}
          color="red" icon labelPosition="left">
          <Icon name="cart" floated="right" />
          Add to Cart
        </Button>
      </div>
    </Card.Content>
  </Card>
);

const styles = {
  image: {
    margin: '10px',
    backgroundColor: 'white',
    height: '300px',
  },
  card: {
    margin: '20px',
    width: 'calc((100vw / 4) - 70px )',
  },
  rating: {
    display: 'flex',
    marginTop: '10px',
  },
  review: {
    display: 'flex',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
  },
};
export default ProductsCard;
