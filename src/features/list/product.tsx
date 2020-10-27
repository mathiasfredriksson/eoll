import React, { useState } from 'react';
import { useSelector  } from 'react-redux';
import {
	getProductById
} from '../product/reducer';
import styles from './product.module.css';
import {
  	Link
} from "react-router-dom";

interface Props {
	id: string,
	key:String
}

const Product = (props:Props) => {

	const [ hovered, setHovered ] = useState(false);
	const toggleHover = () => setHovered(!hovered);
	const product = useSelector(getProductById(props.id));
	const imageUrl = process.env.PUBLIC_URL + '/images/thumbnails/' + product?.name.toLowerCase() + '.jpg';
	const to = '/product/' + product?.id;

	const colorElements = product?.color?.map((aColor:string, index:number) => {

		return <div
			key={ aColor + index }
			className={ styles.color }>
			<div style={{ color: aColor }} className={ styles.circle } />
		</div>
	});

	return (
		<li
			onMouseEnter={ toggleHover }
			onMouseLeave={ () => { hovered && toggleHover() } }>
			<Link
				style={{ textDecoration: 'none' }}
				to={ to }
				className={ styles.product }>
				<div className={ styles.productImage }>
					<img src={ imageUrl } alt={ product?.name } />
					<div className={ hovered ? [styles.overlay, styles.visible].join(' ') : styles.overlay }>
						<div className={ styles.colorContainer }>
							AVAILABLE IN
							<div className={ styles.colorContent }>
								{ colorElements }
							</div>
						</div>
					</div>
				</div>
				<span className={ styles.productName } >{ product?.name }</span>
				<div className={ styles.productBottom } >
					<span>{ product?.brand }</span>
					<div className={ styles.divider } />
					<span>{ product?.price }$</span>
				</div>
			</Link>
		</li>
	);
}

export default Product;
