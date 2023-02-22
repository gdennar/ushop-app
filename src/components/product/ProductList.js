import React, { useState } from "react";
import "./ProductList.css";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector } from "react-redux";
import Search from "../Search";
import ProductItem from "./ProductItem";

const ProductList = () => {
	const [grid, setGrid] = useState(true);
	const [search, setSearch] = useState("");

	const products = useSelector((state) => state.product.products);
	return (
		<section className="product-list" id="products">
			<div className="product-top">
				<div className="icons">
					<GridViewIcon
						sx={{ color: "#ffb700", font: "22" }}
						onClick={() => setGrid(true)}
					/>
					<ViewListIcon
						sx={{
							backgroundColor: "rgba(4, 20, 42, 0.937)",
							color: "#fff",
							font: "22",
						}}
						onClick={() => setGrid(false)}
					/>
					<span>
						<b>{products.length}</b> Products found
					</span>
				</div>
				<div>
					<Search
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
				<div className="sort">
					<form>
						<label htmlFor="">Sort by:</label>

						<select name="category" id="product">
							<option value="latest">Latest</option>
							<option value="lowest-price">Lowest Price</option>
							<option value="highest-price">Highest Price</option>
							<option value="highest-price">Highest Price</option>
							<option value="a-z">A - Z</option>
							<option value="z-a">Z - A</option>
						</select>
					</form>
				</div>
			</div>
			<div className="list-grid">
				{products.length === 0 ? (
					<p>No product found.</p>
				) : (
					<>
						{products.map((product) => {
							return (
								<div key={product.id}>
									<ProductItem {...product} grid={grid} product={product} />
								</div>
							);
						})}
					</>
				)}
			</div>
		</section>
	);
};

export default ProductList;
