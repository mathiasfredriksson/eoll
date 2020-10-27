import React, { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
	getProductById
} from '../product/reducer';
import { addToCart } from './../cart/reducer';
import styles from './product.module.css';

interface Props {
	id: string
}

const Product = (props:Props) => {

	const dispatch = useDispatch();
	const [color, setColor] = useState('');
	const product = useSelector(getProductById(props.id));
	const imageUrl = process.env.PUBLIC_URL + '/images/products/' + product?.name.toLowerCase() + '.jpg';
	const colorElements = product?.color?.map((aColor:string, index:number) => {

		return <div
			key={ aColor + index }
			className={ styles.color }
			onClick={() => {

				setColor(aColor);

			}}>
			<div style={{ color: aColor }} className={ styles.circle } />
			<span>{ aColor }</span>
		</div>
	});

	return (
		<div className={ styles.product }>
			<div className={ styles.image }>
				<img src={ imageUrl } alt={ product?.name } />
			</div>
			<div className={ styles.details }>
				<div className={ styles.row }>
					<span className={ styles.productName } >{ product?.name.toUpperCase() }</span>
				</div>
				<div className={ styles.row }>
					<span>{ product?.brand.toUpperCase() }</span>
					<div className={ styles.divider } />
					<span>{ product?.price }$</span>
				</div>
				<hr />
				<div className={ styles.colorContainer }>
					<span>SELECT COLOR</span>
					<br />
					<div className={ styles.colorContent }>
						{ colorElements }
					</div>
				</div>
				<hr />
				<br />
				<div className={ styles.centeredRow }>
					<Button
						onClick={() => {

							dispatch(addToCart(product?.id));
						}}
						disabled={ color === '' }
						variant="contained">
						ADD TO BAG
					</Button>
				</div>
				<br />
				<br />
				<br />
				<div>MATERIAL</div>
				<span>{ product?.material.toUpperCase() }</span>
				<br />
				<div>SIZE</div>
				<span>{ product?.size.toUpperCase() }</span>
				<br />
				<div>SHAPE</div>
				<span>{ product?.shape.toUpperCase() }</span>
			</div>
		</div>
	);
}

export default Product;
