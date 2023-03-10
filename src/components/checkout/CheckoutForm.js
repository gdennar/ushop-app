import React, { useEffect, useState } from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkout/CheckoutSummary";
import spinner from "../../assests/spinner.jpg";
import { Button, Card } from "@mui/material";
import "./CheckoutForm.css";
import { toast } from "react-toastify";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}
	}, [stripe]);

	const saveOrder = () => {
		console.log("order saved");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		const confirmPayment = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: "http://localhost:3000/checkout-success",
				},
				redirect: "if_required",
			})
			.then((result) => {
				if (result.error) {
					toast.error(result.error.message);
					setMessage(result.error.message);
					return;
				}
				if (result.paymentIntent) {
					if ((result.paymentIntent.status = "succeeded")) {
						setIsLoading(false);
						toast.success("Payment Successful");
						saveOrder();
					}
				}
			});
		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<section>
			<div className="container payment-checkout">
				<h3>Checkout</h3>
				<form onSubmit={handleSubmit}>
					<div>
						<Card>
							<CheckoutSummary />
						</Card>
					</div>
					<div className="pay">
						<Card>
							<h3>Stripe Checkout</h3>
							<PaymentElement
								id="payment-element"
								options={paymentElementOptions}
							/>
							<Button
								disabled={isLoading || !stripe || !elements}
								id="submit"
								className="button"
							>
								<span id="button-text">
									{isLoading ? (
										<img
											src={spinner}
											alt="loading..."
											style={{ width: "20px" }}
										/>
									) : (
										"Pay now"
									)}
								</span>
							</Button>
							{message && <div id="payment-message">{message}</div>}
						</Card>
					</div>
				</form>
			</div>
		</section>
	);
};
export default CheckoutForm;
