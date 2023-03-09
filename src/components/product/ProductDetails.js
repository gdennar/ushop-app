import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import SpinnerImg from "../../assests/spinner.jpg";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/CartSlice";

const ProductDetails = () => {
	const [product, setProduct] = useState(null);
	const cartItems = useSelector((state) => state.cart.cartItems);

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		getProduct();
	}, []);

	const getProduct = async () => {
		const docRef = doc(db, "products", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			//console.log(docSnap.data());
			const obj = {
				id: id,
				...docSnap.data(),
			};
			setProduct(obj);
		} else {
			toast.error("No product found");
		}
	};

	const findItem = cartItems.find((cart) => cart.id === id);

	const addToCart = (product) => {
		dispatch(cartAction.addToCart(product));
		dispatch(cartAction.calculateCartQuantity());
	};
	const decreaseProductCount = (cart) => {
		dispatch(cartAction.decreaseCartItem(cart));
		dispatch(cartAction.calculateCartQuantity());
	};

	const increaseProductCount = (cart) => {
		dispatch(cartAction.addToCart(cart));
		dispatch(cartAction.calculateCartQuantity());
	};

	return (
		<section>
			<ToastContainer />
			<div className="container product-product">
				<h3>Product Details</h3>
				<div>
					<Link to="/#products">&larr; back to products</Link>
				</div>
				{product === null ? (
					<img src={SpinnerImg} alt="Loading..." style={{ width: "50px" }} />
				) : (
					<>
						<div className="product-details">
							<div className="product-img">
								<img src={product.imageUrl} alt={product.name} />
							</div>
							<div className="product-content">
								<h3>{product.name}</h3>
								<p className="product-price">{`₦${product.price.toLocaleString()}`}</p>
								<p>{product.desc}</p>
								<p>
									<b>SKU: </b>
									{product.id}
								</p>
								<p>
									<b>Brand:</b>
									{product.brand}
								</p>
								{findItem ? (
									<div className="product-count">
										<button
											className="product--btn"
											onClick={() => decreaseProductCount(product)}
										>
											-
										</button>
										<p>
											<b>{findItem.cartQuantity}</b>
										</p>
										<button
											className="product--btn"
											onClick={() => increaseProductCount(product)}
										>
											+
										</button>
									</div>
								) : (
									""
								)}
								<Button
									sx={{ backgroundColor: "#ffb700", color: "#fff" }}
									onClick={() => {
										addToCart(product);
									}}
									className="product-detail-btn"
								>
									Add to cart
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default ProductDetails;
