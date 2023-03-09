import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
	previousUrl: "",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.id === newItem.id
			);
			if (!existingItem) {
				const tempProduct = { ...newItem, cartQuantity: 1 };
				state.cartItems.push(tempProduct);
				toast.success(`${newItem.name} added to cart`, {
					position: "top-left",
				});
			} else {
				existingItem.cartQuantity++;
				state.cartTotalAmount = existingItem.price;
				toast.success(`${newItem.name} quantity by 1`, {
					position: "top-left",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		decreaseCartItem: (state, action) => {
			const cartItem = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.id === cartItem.id
			);
			if (existingItem.cartQuantity === 1) {
				const newCartItem = state.cartItems.filter(
					(item) => item.id !== cartItem.id
				);
				state.cartItems = newCartItem;
			} else {
				existingItem.cartQuantity--;
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart: (state, action) => {
			const cartItem = action.payload;
			const newCartItem = state.cartItems.filter(
				(item) => item.id !== cartItem.id
			);
			state.cartItems = newCartItem;
			toast.success(`${cartItem.name} removed from cart`, {
				position: "top-left",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		clearCart: (state, action) => {
			state.cartItems = [];
			toast.info(`Cart cleared`, {
				position: "top-left",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		calculateSubtotal: (state, action) => {
			const arr = [];
			state.cartItems.map((item) => {
				const { price, cartQuantity } = item;
				const itemPrices = price * cartQuantity;
				return arr.push(itemPrices);
			});
			const totalAmount = arr.reduce((a, b) => {
				return a + b;
			}, 0);
			state.cartTotalAmount = totalAmount;
		},
		calculateCartQuantity: (state, action) => {
			const arr = [];
			state.cartItems.map((item) => {
				const { cartQuantity } = item;
				const itemPrices = cartQuantity;
				return arr.push(itemPrices);
			});
			const totalQuantity = arr.reduce((a, b) => {
				return a + b;
			}, 0);
			state.cartTotalQuantity = totalQuantity;
		},
		saveUrl: (state, action) => {
			state.previousUrl = action.payload;
		},
	},
});

export const cartAction = cartSlice.actions;

export default cartSlice;
