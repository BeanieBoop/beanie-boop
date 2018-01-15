import React from 'react';

import FilterNav from './FilterNav'
import ProductsCard from './ProductsCard'


const ProductsWrapper = ({products,category, categories,location, changeCategory,changeOrder}) => (
	<div>
		<FilterNav category={category} changeCategory={changeCategory} changeOrder={changeOrder} categories={categories}/>
		<div style={styles.cards}>
			{products.map(product => <ProductsCard key={product.id} product={product}/>)}
		</div>
	</div>
);


const styles={
	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '30px',
		marginRight: '30px',
		marginTop: '10px'
	}
}
export default ProductsWrapper;
