import { Button, Card } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartAction } from "../../store/CartSlice";
import ClearIcon from "@mui/icons-material/Clear";
import "./Cart.css";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
	const cartTotalQuantity = useSelector(
		(state) => state.cart.cartTotalQuantity
	);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const decreaseProductCount = (cart) => {
		dispatch(cartAction.decreaseCartItem(cart));
	};

	const increaseProductCount = (cart) => {
		dispatch(cartAction.addToCart(cart));
	};

	const deleteItem = (cart) => {
		dispatch(cartAction.removeFromCart(cart));
	};

	const clearCart = () => {
		dispatch(cartAction.clearCart());
	};

	useEffect(() => {
		dispatch(cartAction.calculateSubtotal());
		dispatch(cartAction.calculateCartQuantity());
		dispatch(cartAction.saveUrl(""));
	}, [dispatch, cartItems]);

	const url = window.location.href;

	const checkOutHandler = () => {
		if (isLoggedIn) {
			navigate("/checkout-details");
		} else {
			dispatch(cartAction.saveUrl(url));
			navigate("/login");
		}
	};

	return (
		<section>
			<div className="container cart-table">
				<h3>Shopping Cart</h3>
				{cartItems.length === 0 ? (
					<>
						<p>You have no products in your cart</p>
						<br />
						<div>
							<Link to="/#products">&larr; Continue shopping</Link>
						</div>
					</>
				) : (
					<>
						<table>
							<thead>
								<tr>
									<th>s/n</th>
									<th>Product</th>
									<th>Price</th>
									<th>Quantiy</th>
									<th>Total</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((cart, index) => {
									const { id, name, price, imageUrl, cartQuantity } = cart;
									return (
										<tr key={id}>
											<td>{index + 1}</td>
											<td>
												<p>
													<b>{name}</b>
												</p>
												<img src={imageUrl} alt={name} className="cart-image" />
											</td>
											<td>{price}</td>
											<td>
												<div className="cart-count">
													<button
														className="product--btn"
														onClick={() => decreaseProductCount(cart)}
													>
														-
													</button>
													<b>{cartQuantity}</b>
													<button
														className="product--btn"
														onClick={() => increaseProductCount(cart)}
													>
														+
													</button>
												</div>
											</td>
											<td>{(price * cartQuantity).toFixed(2)}</td>
											<td className="cart-icons">
												<ClearIcon
													sx={{ color: "red", fontSize: "22px" }}
													onClick={() => {
														deleteItem(cart);
													}}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className="cart-summary">
							<Button
								sx={{ backgroundColor: "#ffb700", color: "#fff" }}
								onClick={clearCart}
								className="product-detail-btn"
							>
								Clear Cart
							</Button>

							<div className="checkout">
								<div>
									<Link to="/#products">&larr; Continue shopping</Link>
								</div>
								<br />
								<Card className="cart-card">
									<p>
										<b>{`Cart Item(s): ${cartTotalQuantity}`}</b>
									</p>
									<div className="cart-text">
										<h3>Subtotal: </h3>
										<h3>{`₦${cartTotalAmount.toLocaleString()}`}</h3>
									</div>
									<p>Tax and shipping calculated at checkout</p>
									<Button
										variant="contained"
										sx={{ width: "100%" }}
										onClick={checkOutHandler}
									>
										Checkout
									</Button>
								</Card>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Cart;
