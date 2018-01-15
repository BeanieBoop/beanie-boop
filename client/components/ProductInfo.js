import React from 'react';
//import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import { Label, Card, Loader } from 'semantic-ui-react';

function ProductInfo(props) {
  const { product, reviews, isLoggedIn } = props;
  const Review = (
    <a>
      <Label as="a" color="orange">
        {/*
        Not sure how to load single review associated with current product
        */}
      </Label>
    </a>
  );

  return (
    // prettier-ignore
    <div>
    <Card
      image={product.imgUrl}
      name={product.name}
      description={product.description}
      price={product.price}
    />
    <div> {isLoggedIn ? <Review /> : <Loader active inline="centered" />}</div>
    </div>
  );
}

const mapStateToProps = function(state, ownProps) {
  const productId = +ownProps.match.params.productId;
  return {
    product: state.products.find(product => product.id === productId),
  };
};

export default connect(mapStateToProps)(ProductInfo);

