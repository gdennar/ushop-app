import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		storeProducts: (state, action) => {
			state.products = action.payload.products;
		},
	},
});

export const productAction = productSlice.actions;

export default productSlice;
