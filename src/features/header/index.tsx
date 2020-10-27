import React from 'react';
import styles from './header.module.css';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as CartIcon } from './cart.svg';
import { fetchProductsAction } from './../product/reducer';
import { RootState } from '../../app/store';

interface Props {}

const mapStateToProps = (state:RootState) => ({
	cartItems: state.cart.items
})

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    fetchProducts: fetchProductsAction
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class Header extends React.Component<PropsFromRedux, {}> {

	componentWillMount() {

        const {fetchProducts} = this.props;

        fetchProducts();
    }

	render() {

        const sections = ['ladies', 'gents', 'children', 'trends', 'sale'];
		const sectionElements = sections.map((section, index) => {

			return <NavLink
				exact
				key={ 'section_' + index }
				className={ styles.link }
				to={`/products/`}
				style={{ textDecoration: 'none' }}
				activeStyle={{
					textDecoration: 'none'
				}}>
					{ section.toUpperCase() }
			</NavLink>

		});

		const { cartItems } = this.props;
		const counterElement = cartItems.length > 0 ?
			<span className={ styles.counter }>{ cartItems.length }</span> : '';

		return (
			<header className={ styles.container }>
				<span className={ styles.header }>
					EOLL
				</span>
				<div className={ styles.divider } />
				{ sectionElements }
				<div className={ styles.divider } />
				<div
					className={ styles.link }
					onClick={() => {}}>
					LOGIN
				</div>
				<div
					className={ styles.link }
					onClick={() => {}}>
					HELP
				</div>
				<SearchIcon
					className={ styles.link }
					onClick={() => {}} />
				<div className={ styles.cart }>
					<CartIcon
						className={ styles.link }
						onClick={() => {}}>
					</CartIcon>
					{ counterElement }
				</div>
			</header>
		);
    }
}

export default connector(Header);
