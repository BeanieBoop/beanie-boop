import React from 'react';
//import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import { Segment, Header, Rating } from 'semantic-ui-react';
import { ProductsCard } from '../components';

const styles = {
  wrapper: {
    marginLeft: '30px',
    display: 'flex',
  },
  info: {
    marginTop: '20px',
    marginRight: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};

function ProductInfo(props) {
  const { product, products } = props;
  console.log('product', product);

  if (!products.length) {
    return <p>Loading....</p>;
  }
  return (
    <div style={styles.wrapper}>
      <ProductsCard product={product} />
      <div style={styles.info}>
        <Segment>
          <Header as="h3">Description</Header>
          {product.description}
        </Segment>
        <Segment>
          <Header as="h3">Reviews</Header>
          {product.reviews.map(review => (
            <div key={review.id}>
              {<Rating icon="heart" defaultRating={review.rating} maxRating={5} />} {review.reviewText}
            </div>
          ))}
        </Segment>
      </div>
    </div>
  );
}

const mapStateToProps = function(state, ownProps) {
  const productId = +ownProps.match.params.id;

  return {
    products: state.products.products,
    product: state.products.products.find(product => product.id === productId),
  };
};

export default connect(mapStateToProps)(ProductInfo);
