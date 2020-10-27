import React from 'react';
import Product from './product';
import {
  	RouteComponentProps
} from "react-router-dom";

type TParams = { id: string };

const Index = ({ match }: RouteComponentProps<TParams>) => {

	const id = match.params.id;

	return (
		<Product id={ id } />
	)
}

export default Index;