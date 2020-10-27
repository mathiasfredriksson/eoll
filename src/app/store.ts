import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/product/reducer';
import filterReducer from '../features/filter/reducer';
import cartReducer from '../features/cart/reducer';

export const store = configureStore({
	reducer: {
		products: productReducer,
		filter: filterReducer,
		cart: cartReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
