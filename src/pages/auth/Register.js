import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import registerImg from "../../assests/register.png";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setcPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const registerHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (password !== cPassword) {
			toast.error("Password does not match!");
		}
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setIsLoading(false);
				console.log(user);
				toast.success("Registration successfull");
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
				setIsLoading(false);
			});
	};

	return (
		<>
			<ToastContainer />
			{isLoading && <Loader />}
			<div className="form-container">
				<div className="form-card">
					<form onSubmit={registerHandler}>
						<h2 style={{ color: "orangered" }}>Register</h2>
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
							<div className="input-field">
								<TextField
									required
									id="outlined-required"
									type="password"
									label="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="input-field">
								<TextField
									required
									type="password"
									id="outlined-required"
									label="Confirm Password"
									value={cPassword}
									onChange={(e) => setcPassword(e.target.value)}
								/>
							</div>

							<Button type="submit" variant="contained" className="btn-blue">
								Register
							</Button>
						</div>
						<p>
							Already have an account?{" "}
							<span>
								<Link to="/login">Login</Link>
							</span>
						</p>
					</form>
				</div>
				<div className="login-img">
					<img src={registerImg} width={400} alt="logo" />
				</div>
			</div>
		</>
	);
}

export default Register;
