import React from 'react';
//import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import { Label, Card, Loader , Segment,Header} from 'semantic-ui-react';
import {ProductsCard} from "../components"

function ProductInfo(props) {
  const { product, reviews, isLoggedIn ,products} = props;
  console.log("productInfo", props)
  const Review = (
    <a>
      <Label as="a" color="orange">
        {/*
        Not sure how to load single review associated with current product
        */}
      </Label>
    </a>
  );
  if(!products.length){
    return <p>Loading....</p>
  }
  return (
    // prettier-ignore
    <div style={styles.wrapper}>
      <ProductsCard product={product}/>
      <div style={styles.info}>
        <Segment>
          <Header as='h3'>Description</Header>
          {product.description}
        </Segment>
        <Segment>
          <Header as='h3'>Reviews</Header>
          {product.description}
        </Segment>
      </div>

    {/* <div> {isLoggedIn ? <Review /> : <Loader active inline="centered" />}</div> */}
    </div>
  );
}
const styles={
  wrapper: {
    marginLeft: '30px',
    display: 'flex'
  },
  info:{
    marginTop: '20px',
    marginRight: '40px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
}
const mapStateToProps = function(state, ownProps) {

  const productId = +ownProps.match.params.id;

  return {
    products: state.products.products,
    product: state.products.products.find(product => product.id === productId),
  };
};



export default connect(mapStateToProps)(ProductInfo);
