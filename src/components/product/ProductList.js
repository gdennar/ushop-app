import React, { useEffect, useState } from "react";
import "./ProductList.css";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import ProductItem from "./ProductItem";
import { filterAction } from "../../store/filterSlice";
import Pagination from "../Pagination";

const ProductList = () => {
	const [grid, setGrid] = useState(true);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("latest");
	const products = useSelector((state) => state.product.products);
	const filteredProduct = useSelector((state) => state.filter.filteredProduct);

	// Pagination state
	const [currentPage, setcurrentPage] = useState(1);
	const [productPerPage, setproductPerPage] = useState(9);

	// Get Current Products
	const indexOfLastProduct = currentPage * productPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productPerPage;
	const currentProducts = filteredProduct.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(filterAction.filterBySearch({ products, search }));
	}, [dispatch, search]);

	useEffect(() => {
		dispatch(filterAction.filterBySort({ products, sort }));
	}, [dispatch, sort]);

	return (
		<section className="product-list" id="products">
			<div className="product-top">
				<div className="product-list-icons">
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
						<b>{filteredProduct.length}</b> Products found
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

						<select
							name="category"
							id="product"
							value={sort}
							onChange={(e) => {
								setSort(e.target.value);
							}}
						>
							<option value="latest">Latest</option>
							<option value="lowest-price">Lowest Price</option>
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
						{currentProducts.map((product) => {
							return (
								<div key={product.id}>
									<ProductItem {...product} grid={grid} product={product} />
								</div>
							);
						})}
					</>
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setcurrentPage}
				productPerPage={productPerPage}
				totalProducts={filteredProduct.length}
			/>
		</section>
	);
};

export default ProductList;
