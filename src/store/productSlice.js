import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	minPrice: null,
	maxPrice: null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		storeProducts: (state, action) => {
			state.products = action.payload.products;
		},
		// getPriceRange: (state, action) => {
		// 	const { product } = action.payload;
		// 	const arr = [];
		// 	product.map((prod) => {
		// 		const price = prod.price;
		// 		return arr.push(price);
		// 	});
		// 	state.minPrice = Math.min(...arr);
		// 	state.maxPrice = Math.max(...arr);
		// },
	},
});

export const productAction = productSlice.actions;

export default productSlice;
