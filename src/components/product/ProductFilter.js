import { SettingsBackupRestoreRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../../store/filterSlice";
import "./ProductFilter.css";

const ProductFilter = () => {
	const [category, setCategory] = useState("All");
	const [brands, setBrands] = useState("All");
	const [price, setPrice] = useState("0");
	const products = useSelector((state) => state.product.products);
	const dispatch = useDispatch();

	const allCategory = [
		"All",
		...new Set(products.map((product) => product.category)),
	];

	const allBrand = [
		"All",
		...new Set(products.map((product) => product.brand)),
	];

	const allPrice = [...new Set(products.map((product) => product.price))];

	const filterProducts = (cat) => {
		setCategory(cat);
		dispatch(filterAction.filterByCategory({ products, category: cat }));
	};

	useEffect(() => {
		dispatch(filterAction.filterByBrand({ products, brands }));
	}, [dispatch, products, brands]);

	useEffect(() => {
		dispatch(filterAction.filterByPrice({ products, price }));
	}, [dispatch, products, price]);

	const clearFiltersHandler = () => {
		setCategory("All");
		setBrands("All");
		setPrice("0");
	};

	return (
		<div className="product-filter">
			<h4>Categories</h4>
			<div className="filter-category">
				{allCategory.map((cat, index) => {
					return (
						<button
							key={index}
							type="button"
							className={`${category === cat ? `active` : null}`}
							onClick={() => filterProducts(cat)}
						>
							&#8250; {cat}
						</button>
					);
				})}
			</div>
			<h4>Brand</h4>
			<div className="filter-brand">
				<select
					name="brand"
					value={brands}
					onChange={(e) => setBrands(e.target.value)}
				>
					{allBrand.map((brand, index) => {
						return (
							<option value={brand} key={index}>
								{brand}
							</option>
						);
					})}
				</select>
				<h4>Price</h4>
				<p>{`₦${price.toLocaleString()}`}</p>
				<div className="filter-price">
					<input
						type="range"
						name="price"
						min="0"
						max={Math.max(...allPrice)}
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<br />
				<Button
					sx={{
						backgroundColor: "#ffb700",
						color: "#fff",
						"&:hover": {
							backgroundColor: "orangered",
						},
					}}
					onClick={clearFiltersHandler}
				>
					Clear Filters
				</Button>
			</div>
		</div>
	);
};

export default ProductFilter;
