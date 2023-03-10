import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	shippingAddress: {},
	billingAddress: {},
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			console.log(action.payload);
		},
		saveBillingAddress: (state, action) => {
			state.billingAddress = action.payload;
			console.log(action.payload);
		},
	},
});

export const checkoutAction = checkoutSlice.actions;

export default checkoutSlice;
