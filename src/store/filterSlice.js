import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filteredProduct: [],
};
const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		filterBySearch: (state, action) => {
			const { products, search } = action.payload;
			const tempProduct = products.filter(
				(product) =>
					product.name.toLowerCase().includes(search.toLowerCase()) ||
					product.category.toLowerCase().includes(search.toLowerCase())
			);
			state.filteredProduct = tempProduct;
		},
		filterBySort: (state, action) => {
			const { products, sort } = action.payload;
			let tempProduct = [];
			if (sort === "latest") {
				tempProduct = products;
			}

			if (sort === "lowest-price") {
				tempProduct = products.slice().sort((a, b) => {
					return a.price - b.price;
				});
			}

			if (sort === "highest-price") {
				tempProduct = products.slice().sort((a, b) => {
					return b.price - a.price;
				});
			}

			if (sort === "a-z") {
				tempProduct = products.slice().sort((a, b) => {
					return a.name.localeCompare(b.name);
				});
			}
			if (sort === "z-a") {
				tempProduct = products.slice().sort((a, b) => {
					return b.name.localeCompare(a.name);
				});
			}
			state.filteredProduct = tempProduct;
		},
		filterByCategory: (state, action) => {
			const { products, category } = action.payload;
			console.log(category);
			let tempProduct = [];
			if (category === "All") {
				tempProduct = products;
			} else {
				tempProduct = products.filter(
					(product) => product.category === category
				);
			}
			state.filteredProduct = tempProduct;
		},
		filterByBrand: (state, action) => {
			const { products, brands } = action.payload;

			let tempProduct = [];
			if (brands === "All") {
				tempProduct = products;
			} else {
				tempProduct = products.filter((product) => product.brand === brands);
			}
			state.filteredProduct = tempProduct;
			console.log(state.filteredProduct);
		},
		filterByPrice: (state, action) => {
			const { products, price } = action.payload;
			console.log(action.payload);
			let tempProduct = [];
			if (price === "0") {
				tempProduct = products;
			} else {
				tempProduct = products.filter((product) => product.price <= price);
			}
			state.filteredProduct = tempProduct;
		},
	},
});

export const filterAction = filterSlice.actions;
export default filterSlice;
