import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../store/CartSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkout/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
	const [message, setMessage] = useState("Initializing Checkout");
	const [clientSecret, setClientSecret] = useState("");

	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

	const customerEmail = useSelector((state) => state.auth.email);
	const billingAddress = useSelector((state) => state.checkout.billingAddress);
	const shippingAddress = useSelector(
		(state) => state.checkout.shippingAddress
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(cartAction.calculateSubtotal());
		dispatch(cartAction.calculateCartQuantity());
	}, [dispatch, cartItems]);

	const description = `uShop payment: email: ${customerEmail}, amount:${cartTotalAmount}`;

	useEffect(() => {
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: cartItems,
				userEmail: customerEmail,
				shipping: shippingAddress,
				billing: billingAddress,
				description,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((json) => Promise.reject(json));
				}
			})
			.then((data) => {
				setClientSecret(data.clientSecret);
			})
			.catch((error) => {
				setMessage(error.message);
				toast.error("Oops! something went wrong");
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			<section>
				<div className="container">{!clientSecret && <h3>{message}</h3>}</div>
			</section>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
};

export default Checkout;
