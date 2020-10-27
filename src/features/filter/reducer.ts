import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { productsSelector } from '../product/reducer'
import { RootState } from '../../app/store';
import IFilter from './iFilter';

interface FilterState {
	enabled: Record<string, Array<string>>,
	available: Record<string, Array<string>>
}

const initialState: FilterState = {
	enabled: {},
	available: {}
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		enableFilter: (state, action: PayloadAction<IFilter>) => {

			if (!state.enabled[action.payload.type]) {

				state.enabled[action.payload.type] = [];
			}

			state.enabled[action.payload.type].push(action.payload.value);

		},
		disableFilter: (state, action: PayloadAction<IFilter>) => {

			const index = state.enabled[action.payload.type].findIndex(element => {

				return element === action.payload.value;
			})

			state.enabled[action.payload.type] = [
				...state.enabled[action.payload.type].slice(0, index),
				...state.enabled[action.payload.type].slice(index + 1)
			];
		},
		updateAvailableFilters: (state, action:PayloadAction<Array<Record<string, string>>>) => {

			let values:Array<string>;

			for (let product of action.payload) {

				for (let key of Object.keys(product)) {

					if (!state.available[key]) {

						state.available[key] = [];
					}

					values = state.available[key];

					if (Array.isArray(product[key])) {

						for (let value of product[key]) {

							if (!values.includes(value)) {

								values.push(value);
							}
						}

					} else {

						if (!values.includes(product[key])) {

							values.push(product[key]);
						}
					}

					state.available[key] = values;
				}
			}
		}
	},
});

export const enabledFilters = (state: RootState) => state.filter.enabled;
export const availableFilters = (state: RootState) => state.filter.available;
export const { enableFilter, disableFilter, updateAvailableFilters } = filterSlice.actions;

export const filteredProductsSelector = createSelector(
	[productsSelector, enabledFilters],
	(products, filters) => {

		if (Object.entries(filters).length === 0) return products;

		if (Object.values(filters).every(entry => {

			return entry.length === 0;

		})) {

			return products;
		};

		const result = products.filter(product => {

			return Object.keys(product).some(key => {

				if (!filters[key]) {

					return false;
				}

				if (Array.isArray(product[key])) {

					return filters[key].some(aFilter => product[key].includes(aFilter))
				}

				return filters[key].some(filter => product[key] === filter);
			})
		});

		return result;
	}
)

export const filterByType = (type:string) => createSelector(
	availableFilters,
	filters => {

		return filters[type];
	}
)

export const isFilterEnabled = (type:string, value:string) => createSelector(
	enabledFilters,
	filters => {

		return filters[type] && filters[type].some(enabledFilter => enabledFilter === value);
	}
)

export default filterSlice.reducer;
