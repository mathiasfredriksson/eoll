import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { AppThunk, RootState } from '../../app/store';
import { updateAvailableFilters } from './../filter/reducer';

const initialState:Array<Record<string, any>> = [];

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<any>) => action.payload,
	},
});

export const { setProducts } = productSlice.actions;
export const productsSelector = (state: RootState) => state.products;
export const getProductById = (id:string) => createSelector(
	[productsSelector],
	(products) => {

		return products.find(product => {

			return product.id === id;
		})
	}
)

export const fetchProductsAction = (): AppThunk => async dispatch => {

	const res = await fetch('/products');

	if (res.status !== 200) {

		throw new Error('error');
    }

	const data = await res.json();

	dispatch(productSlice.actions.setProducts(data.products));
	dispatch(updateAvailableFilters(data.products));
};

export default productSlice.reducer;
