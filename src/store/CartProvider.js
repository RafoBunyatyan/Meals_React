import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const cartReduser = (state, action) => {
	if (action.type === 'ADD') {
		const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount

		const existingCartItemIndex = state.items.findIndex(
			item => item.id === action.item.id
		);

		const existingCartItem = state.items[existingCartItemIndex];
		let updateItems;

		if (existingCartItem) {
			const updareItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updateItems = [...state.items];
			updateItems[existingCartItemIndex] = updareItem;
		} else {
			updateItems = state.items.concat(action.item);
		}

		return {
			items: updateItems,
			totalAmount: updateTotalAmount,
		}
	}
	return defaultCartState
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReduser, defaultCartState)

	const addItemToCartHandler = item => {
		dispatchCartAction({ type: 'ADD', item: item })
	}

	const removeItemFormCartHandler = id => {
		dispatchCartAction({ type: 'REMOVE', id: id })
	}
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFormCartHandler,
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartProvider