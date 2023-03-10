import { Button, Card } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CheckoutSummary.css";

const CheckoutSummary = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
	const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);


	return (
		<div className="checkout-card">
			<h3>Checkout Summary</h3>
			<div>
				{cartItems.length === 0 ? (
					<>
						<p>No item in your cart</p>
						<Button>
							<Link to="./#products">Back to shop</Link>
						</Button>
					</>
				) : (
					<>
						<div>
							<p className="cart-item">{`Cart items(s): ${totalQuantity}`}</p>
							<div className="checkout-text">
								<h4>
									<b>SubTotal</b>
								</h4>
								<h3>{`₦${cartTotalAmount.toLocaleString()}`}</h3>
							</div>
							{cartItems.map((item) => {
								const { id, name, price, cartQuantity } = item;

								return (
									<Card key={id} className="checkout-product">
										<h4>Product: {name} </h4>
										<p>Quantity: {cartQuantity}</p>
										<p>Unit Price: {`₦${price.toLocaleString()}`}</p>
										<p>
											Total Product Price:
											{`₦${cartQuantity * price}`}
										</p>
									</Card>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CheckoutSummary;
