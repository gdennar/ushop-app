import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import login from "../../assests/login.png";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const provider = new GoogleAuthProvider();

	const loginHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user) {
					setIsLoading(false);
					toast.success("Logged In");
					navigate("/");
				}
			})
			.catch((error) => {
				setIsLoading(false);
				toast.error(error.message);
			});
	};

	const googleSignInHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const user = result.user;
				setIsLoading(false);
				toast.success("Logged In");
				navigate("/");
			})
			.catch((error) => {
				setIsLoading(false);
				toast.error(error.message);
			});
	};
	return (
		<>
			<ToastContainer />
			{isLoading && <Loader />}
			<div className="form-container">
				<div className="login-img">
					<img src={login} width={400} alt="logo" />
				</div>
				<div className="form-card">
					<form onSubmit={loginHandler}>
						<h2 style={{ color: "orangered" }}>Login</h2>
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

							<Button type="submit" variant="contained" className="btn-blue">
								Login
							</Button>
						</div>
						<div>
							<Link to="/reset-password">Reset Password</Link>
						</div>

						<p>-- or --</p>
						<Button
							variant="contained"
							sx={{ backgroundColor: "orangered" }}
							onClick={googleSignInHandler}
						>
							Login with Google
						</Button>
						<p>
							Don't have an account?{" "}
							<span>
								<Link to="/register">Register</Link>
							</span>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
