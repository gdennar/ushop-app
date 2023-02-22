import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import resetImg from "../../assests/forgotpassword.png";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const resetHandler = async (e) => {
		e.preventDefault();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success("Password reset email sent!");
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			<ToastContainer />
			<div className="form-container">
				<div className="form-card">
					<form onSubmit={resetHandler}>
						<h2 style={{ color: "orangered" }}>Reset Password</h2>
						<div className="form-group">
							<div className="input-field">
								<TextField
									required
									id="outlined-required"
									label="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<Button variant="contained" className="btn-blue" type="submit">
								Reset Password
							</Button>
						</div>
						<p className="auth-page">
							<span>
								<Link to="/login">Login</Link>
							</span>
							<span>
								<Link to="/register">Register</Link>
							</span>
						</p>
					</form>
				</div>
				<div className="login-img">
					<img src={resetImg} width={400} alt="logo" />
				</div>
			</div>
		</>
	);
}

export default Reset;
