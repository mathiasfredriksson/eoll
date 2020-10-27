import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './filter.module.css';
import {
	isFilterEnabled,
	filterByType,
	enableFilter,
	disableFilter,
} from './reducer';
import IFilter from './iFilter';

interface Props {}
interface FilterProps {
	type:string
}

const Checkbox = (props:IFilter) => {

	const isEnabled = useSelector(isFilterEnabled(props.type, props.value));
	const dispatch = useDispatch();

	const onChange = () => {

		isEnabled ?
			dispatch(disableFilter(props)):
			dispatch(enableFilter(props));
	}

	return <label className={ styles.filter }>
			<input
				name={ props.type + '_' + props.value }
				type="checkbox"
				checked={ isEnabled }
				onChange={() => { onChange() }}	 />
			{ props.value.toUpperCase() }
        </label>
}

const CheckboxList = (props:FilterProps) => {

	const filters = useSelector(filterByType(props.type));

	if (!filters) {

		return <div className={ styles.filterList }></div>
	}

	const filter:IFilter = {
		type: props.type,
		value: ''
	}

	const elements = filters.map(value => {

		filter.value = value;

		return <Checkbox
			key={ 'filter_' + props.type + value }
			{ ...filter } />
	})

	return (
		<div className={ styles.filterList }>
			<span>{ props.type.toUpperCase() }</span>
			{ elements }
		</div>
	);
}

const FilterContainer = (props:Props) => {

	return (
		<div className={ styles.container }>
			<hr />
			<div className={ styles.filterContainer }>
				<CheckboxList type='material' />
				<CheckboxList type='size' />
				<CheckboxList type='shape' />
				<CheckboxList type='brand' />
				<CheckboxList type='color' />
				<CheckboxList type='price' />
			</div>
			<hr />
		</div>
	);
}

export default FilterContainer;