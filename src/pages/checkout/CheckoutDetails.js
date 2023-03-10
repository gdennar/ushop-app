import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { checkoutAction } from "../../store/checkoutSlice";
import "./CheckoutDetails.css";
import Container from "@mui/material/Container";

const initialState = {
	name: "",
	line1: "",
	city: "",
	state: "",
	phone: "",
};

const CheckoutDetails = () => {
	const [shippingAddress, setShippingAddress] = useState({ ...initialState });
	const [billingAddress, setBillingAddress] = useState({ ...initialState });

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(checkoutAction.saveShippingAddress(shippingAddress));
		dispatch(checkoutAction.saveBillingAddress(billingAddress));
		navigate("/checkout");
	};

	const handleShipping = (e) => {
		const { name, value } = e.target;
		setShippingAddress({ ...shippingAddress, [name]: value });
	};

	const handleBilling = (e) => {
		const { name, value } = e.target;
		setBillingAddress({ ...billingAddress, [name]: value });
	};

	return (
		<section>
			<Container>
				<div className="checkout-section">
					<div className="checkout">
						<h3>Checkout Details</h3>

						<form onSubmit={handleSubmit}>
							<Card className="card">
								<h3>Shipping Address</h3>
								<div className="checkout-form-group">
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="Recipient Name"
											name="name"
											value={shippingAddress.name}
											onChange={(e) => handleShipping(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="Address Line 1"
											name="line1"
											value={shippingAddress.line1}
											onChange={(e) => handleShipping(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="City"
											name="city"
											value={shippingAddress.city}
											onChange={(e) => handleShipping(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="State"
											name="state"
											value={shippingAddress.state}
											onChange={(e) => handleShipping(e)}
										/>
									</div>

									<div className="input-field">
										<TextField
											type="number"
											required
											className="checkout-input"
											id="outlined-required"
											label="Phone"
											name="phone"
											value={shippingAddress.phone}
											onChange={(e) => handleShipping(e)}
										/>
									</div>
								</div>
							</Card>
							{/* BILLING ADDRESS */}
							<Card className="card">
								<h3>Billing Address</h3>
								<div className="checkout-form-group">
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="Name"
											name="name"
											value={billingAddress.name}
											onChange={(e) => handleBilling(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="Address Line 1"
											name="line1"
											value={billingAddress.line1}
											onChange={(e) => handleBilling(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="City"
											name="city"
											value={billingAddress.city}
											onChange={(e) => handleBilling(e)}
										/>
									</div>
									<div className="input-field">
										<TextField
											required
											className="checkout-input"
											id="outlined-required"
											label="State"
											name="state"
											value={billingAddress.state}
											onChange={(e) => handleBilling(e)}
										/>
									</div>

									<div className="input-field">
										<TextField
											type="number"
											required
											className="checkout-input"
											id="outlined-required"
											label="Phone"
											name="phone"
											value={billingAddress.phone}
											onChange={(e) => handleBilling(e)}
										/>
									</div>

									<Button
										type="submit"
										variant="contained"
										className="btn-blue"
									>
										Proceed to Checkout
									</Button>
								</div>
							</Card>
						</form>
					</div>
					<div className="checkout-summary">
						<Card>
							<CheckoutSummary />
						</Card>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default CheckoutDetails;
