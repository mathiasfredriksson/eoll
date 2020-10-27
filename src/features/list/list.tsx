import React from 'react';
import { useSelector } from 'react-redux';
import { filteredProductsSelector } from '../filter/reducer';
import Product from './product';
import Filter from '../filter/filter';
import styles from './list.module.css';

const ProductList = () => {

	const filteredProducts = useSelector(filteredProductsSelector);
	const productElements = filteredProducts.map((product, index, productState) => {

		return <Product key={ product.id } id={ product.id } />
	});

	return (
		<div className={ styles.container }>
			<Filter />
			<ul className={ styles.list }>
				{ productElements }
			</ul>
		</div>
	);
}

export default ProductList;
