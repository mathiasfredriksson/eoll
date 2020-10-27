import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
	items: Array<Number>
}

const initialState: FilterState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<number>) => {

			state.items.push(action.payload);
		}
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
