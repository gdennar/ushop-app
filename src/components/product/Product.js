import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { productAction } from "../../store/productSlice";
import Loader from "../Loader";
import classes from "./Product.module.css";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Product = () => {
	const [showFilter, setShowFilter] = useState(false);
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.product.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			productAction.storeProducts({
				products: data,
			})
		);
	}, [dispatch, data]);

	const toggleFilterHandler = () => {
		setShowFilter(!showFilter);
	};
	return (
		<section>
			{isLoading && <Loader />}
			<ToastContainer />
			<div className={`container ${classes.product}`}>
				<aside
					className={
						showFilter
							? `${classes.filter} ${classes.show}`
							: `${classes.filter}`
					}
				>
					<ProductFilter />
				</aside>
				<div className={classes.content}>
					<ProductList product={products} />
					<div className={classes.filterIcon} onClick={toggleFilterHandler}>
						<FilterAltIcon sx={{ color: "#ffb700" }} />
						<p>
							<b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Product;
